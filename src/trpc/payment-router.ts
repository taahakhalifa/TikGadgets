import { router, privateProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getPayLoadClient } from "../get-payload";
import { stripe } from "../lib/stripe";

export const paymentRouter = router({
    createSession: privateProcedure
        .input(z.object({ productIds: z.array(z.string()) }))
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx;
            let { productIds } = input;

            if (productIds.length === 0) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            const payload = await getPayLoadClient();

            const { docs: products } = await payload.find({
                collection: "products",
                where: {
                    id: {
                        in: productIds,
                    },
                },
            });

            const filteredProducts = products.filter((product) =>
                Boolean(product.priceId)
            );

            const order = await payload.create({
                collection: "orders",
                data: {
                    _isPaid: false,
                    products: filteredProducts.map((prod) => prod.id),
                    user: user.id,
                },
            });

            try {
                const stripeSession = await stripe.checkout.sessions.create({
                    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
                    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                    payment_method_types: ["card", "paypal"],
                    mode: "payment",
                    metadata: {
                        userId: user.id,
                        orderId: order.id,
                    },
                });
            } catch (err) {}
        }),
});
