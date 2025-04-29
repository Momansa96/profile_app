"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlignRight } from "lucide-react";
import { checkAndAddUser } from "../actions";

const Navbar = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement) {
                if (!event.target.closest(".menu-container")) {
                    setMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        const email = user?.emailAddresses?.[0]?.emailAddress;
        const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "";
        const clerkId = user?.id || "";
        if (!email || !fullName || !clerkId) return;
        checkAndAddUser(email, fullName, clerkId)
    }, [user]);

    if (!isLoaded) return null;

    const menuLinks = isSignedIn
        ? [
            { href: "/", label: "Accueil" },
            { href: "/dashboard/candidat/Opportunity", label: "Opportunités" },
            { href: "/dashboard/candidat", label: "Profiler" },
            { href: "/dashboard/candidat/Mon-Portfolio/[userId]", label: "Mon Portfolio" },
        ]
        : [
            { href: "./", label: "Accueil" },
            { href: "#features", label: "Fonctionnalités" },
            { href: "#pricing", label: "Plans" },
            { href: "#faq", label: "FAQ" },
        ];

    return (
        <div className="bg-base-200/40 px-5 md:px-[10%] py-2 relative">
            <header className="bg-white rounded-lg fixed top-0 right-0 left-0 z-10">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center gap-6 justify-end">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link className="block text-teal-600" href="/">
                                <Image src="/profile-app-logo.png" width={130} height={130} alt="Logo Profile App" />
                            </Link>
                        </div>

                        <div className="md:items-center md:gap-12 hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-x">
                                    {menuLinks.map((link, index) => (
                                        <li key={index} >
                                            {link.label === "Mon Portfolio" ? (
                                                <a
                                                    className="text-gray-500 transition hover:text-teal-700/75 relative"
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {link.label}
                                                    <span className="text-sm text-green-700 rounded-lg p-1 border-green-700  badge absolute -right-4  top-5">Version test</span>
                                                </a>
                                            ) : (
                                                <Link className="text-gray-500 transition hover:text-teal-700/75" href={link.href}>
                                                    {link.label}
                                                </Link>
                                            )}
                                            
                                        </li>
                                    ))}
                                    {isSignedIn && <UserButton />}
                                </ul>
                            </nav>
                        </div>

                        {!isSignedIn && (
                            <div className="hidden sm:flex">
                                <Link className="rounded-md bg-teal-600 hover:bg-gray-200 hover:text-teal-600 px-5 py-2.5 text-sm font-medium text-white" href="/sign-up">
                                    S&apos;inscrire
                                </Link>
                            </div>
                        )}

                        <div className="block md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <AlignRight />
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-gray-200 mx-4 my-1 absolute right-0 w-[50%] rounded-xl overflow-hidden shadow-lg menu-container z-9999">
                        <nav aria-label="Mobile Navigation">
                            <ul className="flex flex-col gap-6 text-sm bg-gray-100 p-3">
                                {menuLinks.map((link, index) => (
                                    <li key={index}>
                                        {link.label === "Mon Portfolio" ? (
                                            <a
                                                className="text-gray-500 transition hover:text-gray-500/75 flex justify-between items-center relative"
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {link.label}
                                                <span className="text-sm text-green-700 rounded-lg p-1 border-green-700  badge">Version test</span>

                                            </a>
                                        ) : (
                                            <Link className="text-gray-500 transition hover:text-gray-500/75" href={link.href}>
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {!isSignedIn && (
                            <div className="p-3">
                                <Link className="block text-center rounded-md bg-teal-600 hover:bg-gray-200 hover:text-teal-600 px-4 py-2.5 text-sm font-medium text-white" href="/sign-up">
                                    S&apos;inscrire
                                </Link>
                            </div>
                        )}

                        {isSignedIn && (
                            <div className="p-3 flex items-center gap-4 text-teal-600 uppercase font-bold">
                                Mon Compte <UserButton />
                            </div>
                        )}
                    </div>
                )}
            </header>
        </div>
    );
};

export default Navbar;
