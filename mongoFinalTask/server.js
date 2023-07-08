import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
config();
const app = express();
mongoose.connect(process.env.MONGO_URL).then((result)=>{

    app.listen(process.env.port||8080, (error)=>{
        if(error){
            console.log("Failed to connect", error);
            return;
        }
        initRoutes();
        console.log("Listening to port 8080");
    });
}).catch((err)=>{
    console.log(connectionUrl)
    console.log("error")
    console.log(err)
}) ;

import productRoutes from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orders from './routes/orderRoutes.js'
function initRoutes(){
    app.use(express.json());
    app.use(productRoutes);
    app.use(authRoutes);
    app.use(orders);
}
