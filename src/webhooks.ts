import express from "express";
import { WebhookRequest } from "./server";
import { stripe } from "./lib/stripe";
import type Stripe from "stripe";
import { getPayLoadClient } from "./get-payload";

export const stripeWebhookHandler = async (
    req: express.Request,
    res: express.Response
) => {
    const webhookRequest = req as any as WebhookRequest;
    const body = webhookRequest.rawBody;
    const signature = req.headers["stripe-signature"] || "";

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ""
        );
    } catch (err) {
        return res
            .status(400)
            .send(
                `Webhook Error: ${
                    err instanceof Error ? err.message : "Unknown Error"
                }`
            );
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if (!session?.metadata?.userId || !session?.metadata?.orderId) {
        return res
            .status(400)
            .send(`Webhook Error: No user present in metadata`);
    }

    if (event.type === "checkout.session.completed") {
        const payload = await getPayLoadClient();

        const { docs: users } = await payload.find({
            collection: "users",
            where: {
                id: {
                    equals: session.metadata.userId,
                },
            },
        });

        const [user] = users;

        if (!user)
            return res.status(404).json({ error: "No such user exists." });
    }
};
