import * as orderModel from '../models/orderBodyModel.js';

export async function makeOrder(req, res){
    const {role, ...userData} = req.user;
    let products = req.body;
    let order = {
        customer: userData,
        products:products,
        totalPrice: products.reduce((total, product) => total + (product.price * product.amount), 0)
    }
    let response  = await orderModel.placeOrder(order);
    res.status(response.statusCode).send(response.result);
}
