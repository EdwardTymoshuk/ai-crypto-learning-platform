import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be ar least 8 characters long.'
    })
})

export const PaymentCredentialsValidator = z.object({
    name: z.string().min(3),
    surname: z.string().min(3),
    email: z.string().email(),
}) 

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
export type TPaymentCredentialsValidator = z.infer<typeof PaymentCredentialsValidator>