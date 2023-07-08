import Joi  from "joi";
import Products from "./schema/productSchema.js";
export const productSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().integer().min(1).required(),
    description: Joi.string().required(),
    categoryId: Joi.number().integer().min(1).max(24).required(),
    images: Joi.array().items(Joi.string()).required()
});

export const productUpdateSchema = Joi.object({
    title: Joi.string(),
    price: Joi.number().integer().min(1),
    description: Joi.string(),
    categoryId: Joi.number().integer().min(1).max(24),
    images: Joi.array().items(Joi.string())
});

export async function addProduct(product) {
    try {
        let newProduct = new Products(product);
        let result = await newProduct.save();
        return {statusCode:200, result:{success:true, result:result}};
    } catch (err) {
        return { statusCode: 500, result: { success: false, message: "error occured" } };
    }
}

export async function updateProductInfo(productId, updateBody){
    let response = {success:true};
   await Products.findByIdAndUpdate(productId, updateBody).catch((err) => {
    response = {success:false, message: "invalid product id"}
   });
   return response;
}

export async function getProducts(filter={}){
    return await Products.find(filter,{__v:0});
}

export async function deleteProduct(productId){
    let response = {success:true};
    await Products.findByIdAndDelete(productId).catch((err) => {
     response = {success:false, message: "invalid product id"}
    });
    return response;
}
