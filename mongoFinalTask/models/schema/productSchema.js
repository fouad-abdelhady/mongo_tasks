import mongoose from "mongoose";
const Schema = mongoose.Schema;
const product = {
    title: {type:String, required: true},
    price: {type:Number, required: true},
    description: String,
    categoryId: {type:Number, required: true},
    images: {type:[String], default:[]}
}
const productSchema = new Schema(product);
const Product = mongoose.model('Product', productSchema, 'products');
export default Product;