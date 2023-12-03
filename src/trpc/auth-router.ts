import { getPayLoadClient } from "../get-payload";
import { AuthCredentialValidator } from "../lib/validators/account-credentials-validators";
import { publicProcedure, router } from "./trpc";
import {TRPCError} from "@trpc/server"

export const authRouter = router({
  createPayloadUser: publicProcedure.input(AuthCredentialValidator).mutation(async ({input}) => {
    const {email, password} = input
    const payload = await getPayLoadClient()

    // check if user already exists
    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email
        }
      }
    })

    if (users.length !== 0) 
      throw new TRPCError({code: "CONFLICT"})

      await payload.create({
        collection: "users",
        data: {}
      })
    
  })
})