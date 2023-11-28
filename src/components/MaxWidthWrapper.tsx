import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
    className,
    children,
}: {
    className?: string; // optional as we don't need to pass it a string
    children: ReactNode; // type which react provides to us
}) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
