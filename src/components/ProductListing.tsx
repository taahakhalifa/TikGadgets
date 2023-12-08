"use client";

import { useEffect, useState } from "react";
import { Product } from "../payload-types";
import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "../lib/utils";
import Link from "next/link";

interface ProductListingProps {
    product: Product | null;
    index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);

        return () => clearTimeout(timer);
    }, [index]);

    if (!product && !isVisible) return <ProductPlaceholder />;

    if (product && isVisible) {
        return (
            <Link
                href={`/product/${product.id}`}
                className={cn(
                    "invisible h-full w-full cursor-pointer group/main",
                    {
                        "visible animate-in fade-in-5": isVisible,
                    }
                )}
            >
                <div className="flex flex-col w-full">
                    <div>Image</div>
                    <h3>Product Name</h3>
                    <p>Category</p>
                    <p>Price</p>
                </div>
            </Link>
        );
    }
    return null;
};

const ProductPlaceholder = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
            <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
            <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
        </div>
    );
};

export default ProductListing;
