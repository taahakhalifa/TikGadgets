import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Link from "next/link";
import { getPayLoadClient } from "@/get-payload";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";

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

    if (!product) return notFound()

    const category = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product?.category
    )?.label;

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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                        </div>

                        <section className="mt-4">
                            <div className="flex items-center">
                                <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>
                                <div className="ml-4 border-l text-muted-foregorund border-gray-300 pl-4">
                                    {category}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default Page;
