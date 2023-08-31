"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
    const session = useSession();
    const router = useRouter();
    const pathName = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const setProfileImg = () => {
        if (session?.data?.user?.image) {
            return session?.data?.user?.image;
        }

        return "/assets/icons/user-icon.png";
    };

    const handleSignOut = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        router.push(data.url);
    };

    useEffect(() => {
        if (pathName === "/signin") {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }, [pathName]);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.status === "authenticated" ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>

                        <button
                            type="button"
                            onClick={() => {
                                handleSignOut();
                            }}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={setProfileImg()}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : session?.status === "unauthenticated" ? (
                    <Link
                        href="/signin"
                        className={`black_btn ${
                            showMenu ? "visible" : "invisible"
                        }`}
                        onClick={() => setShowMenu(false)}
                    >
                        Sign In
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.status === "authenticated" ? (
                    <div className="flex">
                        <Image
                            src={setProfileImg()}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        handleSignOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : session?.status === "unauthenticated" ? (
                    <Link
                        href="/signin"
                        className={`black_btn ${
                            showMenu ? "visible" : "invisible"
                        }`}
                        onClick={() => setShowMenu(false)}
                    >
                        Sign In
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
