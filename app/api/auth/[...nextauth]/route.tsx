import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

export const runtime = "edge";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
