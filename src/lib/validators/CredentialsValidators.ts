import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be ar least 8 characters long.'
    })
})

export const PaymentCredentialsValidator = z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().email(),
})

export const CreateNFTProfileCredentialsValidator = z.object({
    industry: z.string().min(2),
    currentPosition: z.string().min(2),
    experience: z.string().min(10),
    pretendedToBe: z.string().min(2)
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
export type TPaymentCredentialsValidator = z.infer<typeof PaymentCredentialsValidator>
export type TCreateNFTProfileCredentialsValidator = z.infer<typeof CreateNFTProfileCredentialsValidator>