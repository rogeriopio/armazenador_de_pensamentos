import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

//controller

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);

export { router as routerAuth };
