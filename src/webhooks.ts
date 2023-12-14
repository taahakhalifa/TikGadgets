import express from "express";
import { WebhookRequest } from "./server";

export const stripeWebhookHandler = async (
    req: express.Request,
    res: express.Response
) => {
    const webhookRequest = req as any as WebhookRequest;
    const body = webhookRequest.rawBody;
    const signature = req.headers["stripe-signature"] || "";
};
