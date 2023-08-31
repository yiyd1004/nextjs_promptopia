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

export async function middleware(request: NextRequest, response: NextResponse) {
    const session = await getToken({ req: request });

    if (
        !session &&
        ((request.nextUrl.pathname.startsWith("/api/") &&
            request.nextUrl.pathname !== "/api/prompt") ||
            request.nextUrl.pathname === "/create-prompt" ||
            request.nextUrl.pathname === "/update-prompt" ||
            request.nextUrl.pathname.startsWith("/profile"))
    ) {
        return NextResponse.redirect(new URL("/signin", request.url));
    } else if (session && request.nextUrl.pathname === "/signin") {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
}
