import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(
    price: number | string,
    options: {
        currency?: "USD" | "EUR" | "GBP" | "BDT";
        notation?: Intl.NumberFormatOptions["notation"];
    } = {}
) {
    const { currency = "GBP", notation = "compact" } = options;
    const numbericPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        notation,
        maximumFractionDigits: 2,
    }).format(numbericPrice);
}

export function constructMetadata({
    title = "TikGadgets - the marketplace for TikTok's hidden gems",
    description = "TikGadgets is an open-source marketplace for high-quality TikTok gadgets.",
    image = "/thumbnail.png",
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        icons,
        metadataBase: new URL("https://www.tikgadgets.co.uk"),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
