import Joi  from "joi";
import Order from "./schema/orderSchema.js";

const productSchema = Joi.object({
  productId: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.number().min(1).required(),
  amount: Joi.number().min(1).required()
});

export const orderBodySchema = Joi.array().items(productSchema).min(1);

export async function  placeOrder(order){
    try {
        let newOrder = new Order(order);
        let result = await newOrder.save();
        return {statusCode:200, result:{success:true, result:result}};
    } catch (err) {
        console.log(err);
        return { statusCode: 500, result: { success: false, message: "error occured" } };
    }
}