import express from 'express';
import { uploadFile } from '../controller/Upload.js';
import { getWallpapers } from '../controller/getWallpapers.js';
import { adminLogin, adminSignup } from '../controller/adminLogin.js';

const router = express.Router();

router.post('/upload/:id', uploadFile);
router.get('/wallpaper', getWallpapers);
router.post('/adminSignup', adminSignup);
router.post('/adminLogin', adminLogin);

export default router;