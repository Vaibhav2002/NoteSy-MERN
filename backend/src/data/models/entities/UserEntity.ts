import {InferSchemaType, model, Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, require: true, unique: true, select: false},
    password: {type: String, require: true, select: false}
})

type UserModel = InferSchemaType<typeof userSchema>

export default model<UserModel>("User", userSchema)