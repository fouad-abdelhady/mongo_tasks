import express from 'express';
import validate from '../utils/validators.js';
import * as orderSchemas from '../models/orderBodyModel.js';
import * as ordersController from '../controllers/orderController.js';
import * as authController from '../controllers/authController.js';
import actions  from '../utils/actions.js';
const  router = express.Router();

router.post(
    '/placeOrder', [
        authController.verifyUser(actions.placeOrder), 
        validate(orderSchemas.orderBodySchema)], 
        ordersController.makeOrder);

    
export default router;