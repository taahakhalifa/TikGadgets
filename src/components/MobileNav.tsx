"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if (!isOpen)
        return (
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 "
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        );

    return (
        <div>
            <div className="relative z-40 lg:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </div>

            <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
                <div className="w-4/5">
                    <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
