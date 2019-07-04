import express from 'express';
import UserController from '../controllers/userController';
import verify from '../helpers/verifyToken';
import upload from '../helpers/profilePic';
import profileChecker from '../middleware/validators/profileValidator';

const router = express.Router();

router.get('/auth/login', UserController.login);
router.post('/auth/logout', UserController.logOut);
router.put('/user', verify, upload.single('avatar'), profileChecker, UserController.updateProfile);

export default router;
