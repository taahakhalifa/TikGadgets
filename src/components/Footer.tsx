import Link from "next/link";
import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
    return (
        <footer className="bg-white flex-grow-0">
            <MaxWidthWrapper>
                <div className="border-t border-gray-200 py-6 md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} All Rights
                            Reserved
                        </p>
                    </div>
                    <div>
                        <div className="relative flex items-center px-6 py-6 lg:mt-0">
                            <div className="text-center relative mx-auto max-w-sm">
                                <Icons.logo className="h-12 w-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center md:mt-0">
                        <div className="flex space-x-8">
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Terms
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;
