import { ArrowDownToLine, CheckCircle, Store } from "lucide-react";

export const PRODUCT_CATEGORIES = [
  {
    label: "Kitchen Gadgets",
    value: "kitchen_gadgets" as const,
    feature: [
      {
        name: "Trending Kitchen Gadgets",
        href: "#",
        imageSrc: "/nav/kitchen/trending.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/kitchen/new.jpg",
      },
      {
        name: "Bestselling Kitchen Gadgets",
        href: "#",
        imageSrc: "/nav/kitchen/bestsellers.jpg",
      },
    ],
  },
  {
    label: "Home Decor",
    value: "home_decor" as const,
    feature: [
      {
        name: "Unique Home Decor Finds",
        href: "#",
        imageSrc: "/nav/decor/unique.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/decor/new.jpg",
      },
      {
        name: "Bestselling Home Decor",
        href: "#",
        imageSrc: "/nav/decor/bestsellers.jpg",
      },
    ],
  },
  {
    label: "Health & Wellness",
    value: "health_wellness" as const,
    feature: [
      {
        name: "Wellness Essentials",
        href: "#",
        imageSrc: "/nav/wellness/essentials.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/wellness/new.jpg",
      },
      {
        name: "Bestselling Wellness Products",
        href: "#",
        imageSrc: "/nav/wellness/bestsellers.jpg",
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