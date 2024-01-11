import { ArrowDownToLine, CheckCircle, Store } from "lucide-react";

export const PRODUCT_CATEGORIES = [
    {
        label: "Kitchen Gadgets",
        value: "kitchen_gadgets" as const,
        feature: [
            {
                name: "New Arrivals",
                href: "/products?category=kitchen_gadgets&sort=desc",
                imageSrc: "/nav/kitchen/kitchen1.jpg",
            },
            {
                name: "Bestselling Kitchen Gadgets",
                href: "/products?category=kitchen_gadgets",
                imageSrc: "/nav/kitchen/kitchen2.avif",
            },
        ],
    },
    {
        label: "Home Decor",
        value: "home_decor" as const,
        feature: [
            {
                name: "New Arrivals",
                href: "/products?category=home_decor&sort=desc",
                imageSrc: "/nav/decor/decor1.jpeg",
            },
            {
                name: "Unique Home Decor Finds",
                href: "/products?category=home_decor",
                imageSrc: "/nav/decor/decor2.jpeg",
            },
        ],
    },
    {
        label: "Health & Wellness",
        value: "health_wellness" as const,
        feature: [
            {
                name: "New Arrivals",
                href: "/products?category=health_wellness&sort=desc",
                imageSrc: "/nav/wellness/wellness1.webp",
            },
            {
                name: "Bestselling Wellness Products",
                href: "/products?category=health_wellness",
                imageSrc: "/nav/wellness/wellness2.jpeg",
            },
        ],
    },
];

export const perks = [
    {
        name: "Unique Products",
        Icon: Store,
        description:
            "Explore a diverse collection of unique and interesting products.",
    },
    {
        name: "Fast Shipping",
        Icon: ArrowDownToLine,
        description:
            "Enjoy quick and reliable shipping services. Your purchases will arrive promptly and in great condition.",
    },
    {
        name: "Quality Assurance",
        Icon: CheckCircle,
        description:
            "We guarantee the quality of every product. Our team carefully verifies each item to ensure your satisfaction.",
    },
];
