import { z } from "zod"

export const AuthCredentialValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Pasword must be at least 8 caracters long."})
})

export type TAuthCredentialValidator = z.infer<typeof AuthCredentialValidator>

