import Nav from "@/components/Nav";
import AuthProvider from "@/providers/AuthProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        <ToasterProvider />
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
};

export default RootLayout;
