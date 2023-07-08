import mongoose from "mongoose";
const Schema = mongoose.Schema;
const user = {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    refreshToken: { type: String, default: null }
}

const userSchema = new Schema(user);
const User = mongoose.model('user', userSchema, 'users');
export default User;