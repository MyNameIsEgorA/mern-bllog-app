import mongoose from "mongoose";

export type UserType = {
    name: string,
    email: string,
    password: string,
    avatarURL?: string,
    createdTime: Date,
    lastUpdateTime: Date
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
}, {
    timestamps: true
})


export default mongoose.model<UserType>("User", userSchema)