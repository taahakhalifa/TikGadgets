import { router, privateProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const paymentRouter = router({
    createSession: privateProcedure
        .input(z.object({ productIds: z.array(z.string()) }))
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx;
            let { productIds } = input;

            if (productIds.length === 0) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }
        }),
});
