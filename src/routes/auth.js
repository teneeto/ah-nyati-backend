import express from 'express';
import AuthController from '../controllers/Auth';

const router = express.Router();

/**
* @swagger
*
* /auth/google:
*   get:
*     tags:
*       - auth
*     description: Google Social Login
*     produces:
*       - application/json
*     responses:
*       201:
*         description: Success
*/
router.post('/login', AuthController.login);

/**
* @swagger
*
* /auth/google:
*   post:
*     tags:
*       - auth
*     description: Google Social Login
*     produces:
*       - application/json
*     responses:
*       201:
*         description: Success
*/
router.post('/logout', AuthController.logOut);

export default router;
