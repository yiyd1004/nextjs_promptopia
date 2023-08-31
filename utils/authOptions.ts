import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

type CustomProfile = {
    email: string;
    name: string;
    picture?: string;
};

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    throw new Error("Please enter an email ans password");
                }

                const user = await prisma.users.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user.password) {
                    throw new Error("No user found");
                }

                // check password
                const passMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!passMatch) {
                    throw new Error("Password mismatch");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                    image: undefined,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account, profile, session, trigger }) {
            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }

            return token;
        },
        async session({ session, token, user }) {
            const sessionUser = await prisma.users.findUnique({
                where: {
                    email: session.user.email!,
                },
            });

            session.user.id = sessionUser?.id.toString();

            // return session;
            return {
                ...session,
                user: {
                    ...session.user,
                },
            };
        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                let customProfile = profile as CustomProfile;
                if (!customProfile) {
                    customProfile = user as CustomProfile;
                }

                const userExists = await prisma.users.findUnique({
                    where: {
                        email: customProfile?.email,
                    },
                });

                // if not, create new user
                if (!userExists) {
                    await prisma.users.create({
                        data: {
                            email: customProfile.email,
                            username: customProfile.name
                                ?.replace(/\s+/g, "")
                                .toLowerCase(),
                            image: customProfile.picture,
                        },
                    });
                }

                return true;
            } catch (error) {
                console.log("error: ", error);
                return false;
            }
        },
    },
    debug: process.env.NODE_ENV === "development",
};
