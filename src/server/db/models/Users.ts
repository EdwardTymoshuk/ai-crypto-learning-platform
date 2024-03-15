import { Model, Schema, model, models } from "mongoose"
import { TUser } from 'next-auth'


const userSchema = new Schema<TUser>({
    id: { type: String, required: true, unique: true },
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


const User = models?.User as Model<TUser> || model("User", userSchema)


export default User