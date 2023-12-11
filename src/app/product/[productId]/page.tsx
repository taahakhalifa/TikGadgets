// "use client"

import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Link from "next/link";
import { getPayLoadClient } from "@/get-payload";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { Check, Shield } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import ProductReel from "@/components/ProductReel";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps {
    params: {
        productId: string;
    };
}

const BREADCRUMBS = [
    {
        id: 1,
        name: "Home",
        href: "/",
    },
    {
        id: 2,
        name: "Products",
        href: "/products",
    },
];

const Page = async ({ params }: PageProps) => {
    const { productId } = params;

    const payload = await getPayLoadClient();

    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: productId,
            },
        },
    });

    const [product] = products;

    if (!product) return notFound();

    const category = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product?.category
    )?.label;

    const validUrls = product?.images
        .map(({ image }) => (typeof image === "string" ? image : image.url))
        .filter(Boolean) as string[];

    return (
        <MaxWidthWrapper className="bg-white">
            <div className="ng-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:prig ls:max-w-7xl lg:grid-cols-2 ls:gap-x-8 lg:px-8">
                    <div className="lg:max-w-lg lg:self-end">
                        <ol className="flex items-center space-x-2">
                            {BREADCRUMBS.map((breadcrumb, index) => (
                                <li key={breadcrumb.href}>
                                    <div className="flex items-center text-sm">
                                        <Link
                                            href={breadcrumb.href}
                                            className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                                        >
                                            {breadcrumb.name}
                                        </Link>
                                        {index !== BREADCRUMBS.length - 1 ? (
                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                                            >
                                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                            </svg>
                                        ) : null}
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-4">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {product.name}
                            </h1>
                        </div>

                        <section className="mt-4">
                            <div className="flex items-center">
                                <p className="font-medium text-gray-900">
                                    {formatPrice(product.price)}
                                </p>
                                <div className="ml-4 border-l text-muted-foregorund border-gray-300 pl-4">
                                    {category}
                                </div>
                            </div>
                            <div className="mt-4 space-y-6">
                                <p className="text-base text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center">
                                <Check
                                    aria-hidden="true"
                                    className="h-5 w-5 flex-shrink-0 text-green-500"
                                />
                                <p className="ml-2 text-sm text-muted-foreground">
                                    Eligible for instant delivery
                                </p>
                            </div>
                        </section>
                    </div>
                    {/* PRODUCT IMAGES */}
                    <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-center">
                        <div className="aspect-square rounded-lg">
                            <ImageSlider urls={validUrls} />
                        </div>
                    </div>

                    {/* Add to cart section */}
                    <div className="mt-10 lg::col:start:1 lg:row-start-2 lg:max-w-lg lg:self-start">
                        <div>
                            <div className="mt-10">
                                <AddToCartButton />
                            </div>
                            <div className="mt-6 text-center">
                                <div className="group inline-flex text-sm font-medium">
                                    <Shield
                                        aria-hidden="true"
                                        className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                                    />
                                    <span className="text-muted-foreground hover:text-gray-700">
                                        30 Day Guarantee
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductReel
                href="/products"
                query={{ category: product.category, limit: 4 }}
                title={`Similar ${category}`}
                subtitle={`Browse similar high-quality ${category} just like this '${product.name}'`}
            />
        </MaxWidthWrapper>
    );
};

export default Page;
