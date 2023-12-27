"use client";

import { Menu } from "lucide-react";
import { PRODUCT_CATEGORIES } from "../config";
import Image from "next/image";
import Link from "next/link";
import { User } from "../payload-types";
import { useAuth } from "../hooks/use-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";

interface MobileNavProps {
    user: User | null;
}

const MobileNav = ({ user }: MobileNavProps) => {
    const { signOut } = useAuth();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                {isMounted && (
                    <button
                        type="button"
                        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 "
                    >
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                )}
            </SheetTrigger>
            <SheetContent className="flex flex-col lg:hidden">
                <ScrollArea>
                    <div>
                        <div className="relative flex w-full max-w-sm flex-col">
                            <div className="mt-2">
                                <ul>
                                    {PRODUCT_CATEGORIES.map((category) => (
                                        <li
                                            key={category.label}
                                            className="space-y-10 px-4 pb-8"
                                        >
                                            <div className="border-b border-gray-200">
                                                <div className="-mb-px flex">
                                                    <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-semibold">
                                                        {category.label}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                                                {category.feature.map(
                                                    (item) => (
                                                        <div
                                                            key={item.name}
                                                            className="group relative text-sm"
                                                        >
                                                            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <Image
                                                                    fill
                                                                    src={
                                                                        item.imageSrc
                                                                    }
                                                                    alt="product category image"
                                                                    className="object-cover object-center"
                                                                />
                                                            </div>
                                                            <Link
                                                                href={item.href}
                                                                className="mt-6 block font-medium text-gray-900"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {user ? (
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <SheetTrigger asChild>
                                        <button
                                            onClick={signOut}
                                            type="button"
                                            className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600"
                                        >
                                            Sign Out
                                        </button>
                                    </SheetTrigger>
                                </div>
                            ) : (
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <SheetTrigger asChild>
                                            <Link
                                                href="/sign-in"
                                                className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600"
                                            >
                                                Sign in
                                            </Link>
                                        </SheetTrigger>
                                    </div>
                                    <div className="flow-root">
                                        <SheetTrigger asChild>
                                            <Link
                                                href="/sign-up"
                                                className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600"
                                            >
                                                Sign up
                                            </Link>
                                        </SheetTrigger>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
