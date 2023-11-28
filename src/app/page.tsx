import Link from "next/link";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

export default function Home() {
    return (
        <MaxWidthWrapper>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight">
                    Uncover TikTok's Hidden Gems: Must-Have{" "}
                    <span className="text-blue-600">Products</span> and{" "}
                    <span className="text-blue-600">Gadgets</span>.
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                    Welcome to the world of TikTok's hidden gems, where you'll
                    discover must-have products and gadgets that bring joy to
                    your life. Let's explore together!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Link href="/products">Browse Trending</Link>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
