import express from 'express';
import ThoughtController from '../controllers/ThoughtController.js';

const router = express.Router();
//import helper
import { checkAuth } from '../helpers/auth.js';
import { checkAuth2 } from '../helpers/auth2.js';

//controller

router.get('/add', checkAuth, ThoughtController.createThought);
router.post('/add', checkAuth, ThoughtController.addPost);

router.get('/dashboard', checkAuth, checkAuth2, ThoughtController.dashboard);
router.get('/', ThoughtController.showThoughts);

export { router as routerThoughts };
