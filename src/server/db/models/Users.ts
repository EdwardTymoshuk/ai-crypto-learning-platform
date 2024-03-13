import { Model, Schema, model, models } from "mongoose"

export interface TUser {
    id: string,
    email: string
    password: string
    role?: string
    name?: string
    surname?: string
    industry?: string
    position?: string
    pretendedToBe?: string
    experience?: string
    image?: string
    isCompleted: boolean
}

const userSchema = new Schema<TUser>({
    id: { type: String, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    industry: { type: String, required: false },
    position: { type: String, required: false },
    pretendedToBe: { type: String, required: false },
    experience: { type: String, required: false },
    image: { type: String, required: false },
    isCompleted: { type: Boolean, default: false }
}, {
    timestamps: true,
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

const User = models?.User as Model<TUser> || model("User", userSchema)


export default User