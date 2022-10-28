import express from 'express';
import ThoughtController from '../controllers/ThoughtController.js';

const router = express.Router();
//import helper
import { checkAuth } from '../helpers/auth.js';
import { checkYourPost } from '../helpers/identifyPost.js';

//controller

router.get('/add', checkAuth, ThoughtController.createThought);
router.post('/add', checkAuth, ThoughtController.addPost);

router.get('/edit/:id', checkYourPost, checkAuth, ThoughtController.updateThought);
router.post('/edit', checkAuth, ThoughtController.updateThoughtPost);

router.post('/remove', checkYourPost, checkAuth, ThoughtController.removeThought);

router.get('/dashboard', checkAuth, ThoughtController.dashboard);
router.get('/', ThoughtController.showThoughts);

export { router as routerThoughts };
