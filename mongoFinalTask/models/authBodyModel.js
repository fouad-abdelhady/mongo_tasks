import Joi from 'joi';
import crypto from 'crypto-js';
import User from './schema/userSchema.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passworPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8}$/;

export const newUserBodySchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().regex(emailPattern).required(),
    password: Joi.string().min(8).regex(passworPattern).required(),
    role: Joi.string().required()
});
export const loginBodySchema = Joi.object({
    userName: Joi.string().regex(emailPattern).required(),
    password: Joi.string().min(8).regex(passworPattern).required()
});
export async function saveUser(user) {
    try {
        user.password = crypto.PBKDF2(user.password, process.env.SIGN).toString();
        let newUser = new User(user);
        let result = await newUser.save();
        return {statusCode:200, result:{success:true, result:result}};
    } catch (err) {
        if (err.code === 11000) return { statusCode: 400, result: { success: false, message: "The username you entered is already registered" } };
        return { statusCode: 500, result: { success: false, message: "error occured" } };
    }
}
export async function checkCredentials(body) {
    let password = crypto.PBKDF2(body.password, process.env.SIGN).toString();
    let userInfo = await User.findOne({userName: body.userName, password: password}, {password: 0});
    if (!userInfo) return {statusCode: 404, result: { success: false, message: "Invalid username or password" }};
    return {statusCode: 200, result: { success: true, result: userInfo}};
}
export async function updateUserInfo(userId, updateBody){
    return await User.findByIdAndUpdate(userId, updateBody);
}

export async function getUserById(userId) {
    return await User.findById(userId,{password: 0});
}