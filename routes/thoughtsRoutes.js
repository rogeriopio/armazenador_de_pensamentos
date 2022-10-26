import express from 'express';
import ThoughtController from '../controllers/ThoughtController.js';

const router = express.Router();

//controller

router.get('/', ThoughtController.showThoughts);

export { router as routerThoughts };
