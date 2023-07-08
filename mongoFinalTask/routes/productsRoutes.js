import express from 'express';
import validate from '../utils/validators.js';
import * as productSchemas from '../models/productBodyModel.js';
import * as productController from '../controllers/productsController.js';
import * as authController from '../controllers/authController.js';
import actions from '../utils/actions.js';
const  router = express.Router();

router.get(
    '/products/:id([0-9]*)?', 
    authController.verifyUser(actions.getProducts),
    productController.getProducts);
router.post(
    '/products', [
        authController.verifyUser(actions.addProduct), 
        validate(productSchemas.productSchema)], 
        productController.createProduct);
router.put(
    '/products/:id([0-9]*)', [
        authController.verifyUser(actions.updateProduct), 
        validate(productSchemas.productUpdateSchema)] ,
        productController.updateProduct);
router.delete(
    '/products/:id([0-9]*)', 
    authController.verifyUser(actions.deleteProduct), 
    productController.deleteProduct);

export default router;