"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({
    children,
    sessionData,
}: {
    children: React.ReactNode;
    sessionData?: Session;
}) => {
    return <SessionProvider session={sessionData}>{children}</SessionProvider>;
};

export default AuthProvider;
