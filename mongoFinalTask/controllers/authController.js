import * as authBodySchema from '../models/authBodyModel.js';
import actions from '../utils/actions.js';
import Jwt from "jsonwebtoken";

export const users = {
    admin:[actions.all],
    customer:[
        actions.getProducts,
        actions.getCategory,
        actions.placeOrder
    ]
}

export async function createAccount(req, res){
    let user = req.body;
    if(!users[user.role]){
        res.status(400).send({message:"Only the roles of 'admin' or 'customer' are allowed in the request body for the 'role' property."});
        return;
    }
    let result = await authBodySchema.saveUser(user);
    console.log(result);
    res.status(result.statusCode).send(result.result);
}

export async function loginUser(req, res){
    let result = await authBodySchema.checkCredentials(req.body);
    let resultBody = result.result.result;
    
    if(result.statusCode !== 200){
        res.status(result.statusCode).send(result.result);
        return;
    }
    let userForToken = { id: resultBody._id, userName: resultBody.userName, role: resultBody.role };
    result.result.result.refreshToken = createRefreshToken(userForToken);
    result.result.accessToken = createAccessToken(userForToken);
    res.status(result.statusCode).send(result.result);
    authBodySchema.updateUserInfo(userForToken.id, {refreshToken: result.result.result.refreshToken});
}

export function validateNewUser(req, res, next){
    authBodySchema.newUserBodySchema.validate(req.body)
}

export const  verifyUser = (action)=>(req, res, next)=>{
    if(!verifyToken(req, res)) return;
    if(!isUserAuthorized(action, req.user.role)){
        res.status(401).send({message:"You are not authorized to perform that action."});
        return;
    }
    next();
}

export async function getNewToken(req, res){
    if(!verifyToken(req, res,{isAccessToken:false}))return;
    let userData = await authBodySchema.getUserById(req.user.id);
    if(!userData){
        res.status(500).send({ success: false, message:"Error Occured"});
        return;
    }
    if(userData.refreshToken != req.token){
        res.status(401).send({ success: false, message:"The token you sent is old"});
        return;
    }
    res.send({success: true, result:{accessToken: createAccessToken(req.user), refreshToken: userData.refreshToken}});
}

export async function signUserOut(req, res){
    if(!verifyToken(req,res))return;
    let userData = await authBodySchema.updateUserInfo(req.user.id, {refreshToken: null});
    console.log(userData);
    res.send({success: true});
}

function createAccessToken(userInfo){
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = 60 * 15; 
    const exp = now + expiresIn; 
    return Jwt.sign({ ...userInfo, exp }, process.env.ACCESS_TOKEN);
}

function createRefreshToken(userInfo){
    return Jwt.sign(userInfo, process.env.REFRESH_TOKEN);
}

function verifyToken(req, res, options={isAccessToken : true}){
    const token  = req.headers.authorization.split(' ')[1];
    let {isAccessToken} = options;
    if(!token){
        res.status(401).res.send({ success: false, message:"Use POST http://localhost:8080/createAccount or POST http://localhost:8080/login for new token"});
        return false;
    }
    let result = false;
    let key =  isAccessToken ? process.env.ACCESS_TOKEN : process.env.REFRESH_TOKEN;
    Jwt.verify(
        token, 
        key, 
        (err, userInfo)=>{
        if(err){
            res.status(401).send({ success: false, message:isAccessToken?"Use GET http://localhost:8080/freshToken with the refresh token for new token" :"Invalid token"});
            return false;
        }
        req.user = userInfo;
        req.token = token;
        result = true;
    });
    return result;
}

function isUserAuthorized( action, role){
    if(role === 'admin' || users[role].includes(action)) return true;
    return false;
}