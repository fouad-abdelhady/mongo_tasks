import mongoose from "mongoose";
const Schema = mongoose.Schema;
const order = {
    customer:{
        id:{type:String, required:true},
        userName:{type:String, required:true}
    },
    products:[
        {
            productId:{type:String, required:true},
            title:{type:String, required:true},
            price:{type:Number, required:true},
            amount:{type:Number, required:true}
        }
    ],
    totalPrice:{type:Number, default:0},
}

const orderSchema = new Schema(order);
const Order = mongoose.model('Order', orderSchema,'orders');

export default Order;