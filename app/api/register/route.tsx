import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 0;
export const POST = async (req: Request) => {
    const data = await req.json();

    if (!data.email || !data.email || !data.name) {
        return NextResponse.json(
            { message: "Missing Fields" },
            { status: 400 }
        );
    }

    const exist = await prisma.users.findUnique({
        where: {
            email: data.email,
        },
    });

    if (exist) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
        const user = await prisma.users.create({
            data: {
                email: data.email,
                username: data.name.replace(/\s+/g, "").toLowerCase(),
                image: null,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "error", error: e },
            { status: 500 }
        );
    }
};
