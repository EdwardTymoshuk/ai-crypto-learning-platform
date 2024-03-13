import { Model, Schema, model, models } from "mongoose"

export interface TUser {
    email: string
    password: string
    role: string
    name?: string
    surname?: string
    industry?: string
    position?: string
    pretendedToBe?: string
    experience?: string
    image?: string
}

const userSchema = new Schema<TUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, require: true, enum: ['user', 'admin'], default: 'user' },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    industry: { type: String, required: false },
    position: { type: String, required: false },
    pretendedToBe: { type: String, required: false },
    experience: { type: String, required: false },
    image: { type: String, required: false },
}, {
    timestamps: true,
})

export const userSchemaType = userSchema

const User = models?.User as Model<TUser> || model("User", userSchema)


export default User