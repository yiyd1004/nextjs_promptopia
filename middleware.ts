import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/api/prompt/:path*",
        "/api/users/:path*",
        "/signin",
        "/create-prompt",
        "/update-prompt",
        "/profile/:path*",
    ],
};

export async function middleware(req: NextRequest, res: NextResponse) {
    const session = await getToken({ req });
    console.log(session, req.nextUrl.pathname);
    if (
        !session &&
        ((req.nextUrl.pathname.startsWith("/api/") &&
            req.nextUrl.pathname !== "/api/prompt") ||
            req.nextUrl.pathname === "/create-prompt" ||
            req.nextUrl.pathname === "/update-prompt" ||
            req.nextUrl.pathname.startsWith("/profile"))
    ) {
        return NextResponse.redirect(new URL("/signin", req.url));
    } else if (session && req.nextUrl.pathname === "/signin") {
        return NextResponse.redirect(new URL("/profile", req.url));
    }
}
