import express from 'express';
import * as authSchemas from '../models/authBodyModel.js';
import validate from '../utils/validators.js'
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/createAccount', 
    validate(authSchemas.newUserBodySchema),
    authController.createAccount);
router.post('/login', 
    validate(authSchemas.loginBodySchema), 
    authController.loginUser);
router.get('/freshToken', authController.getNewToken);
router.get('/signOut', authController.signUserOut);
export default router;