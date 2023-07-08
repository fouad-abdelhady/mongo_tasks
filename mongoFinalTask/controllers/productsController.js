
import * as productModel from "../models/productBodyModel.js";

export async function getProducts(req, res){
    let productId = req.params.id;
    let filter = {};
    if(productId) filter._id = productId;
    let result  = await productModel.getProducts(filter);
    res.send(result);

}

export async function createProduct(req, res){
    let body = req.body;
   let result = await productModel.addProduct(body);
    res.status(result.statusCode).send({result: result.result});
}

export async function updateProduct(req, res){
    if(!req.params.id){
        res.status(400).send({message: "please enter add the product id in the url"});
        return;
    }
    let response  = await productModel.updateProductInfo(req.params.id, req.body);
    res.send(response);
}

export async function deleteProduct(req, res){
    if(!req.params.id){
        res.status(400).send({message: "please enter add the product id in the url"});
        return;
    }
    res.send(await productModel.deleteProduct(req.params.id));
}