import express from 'express';
import authValidator from '../middleware/authValidator';
import validate from '../middleware/validate';
import checkDuplicate from '../middleware/checkDuplicate';
import UserController from '../controllers/auth';

const router = express.Router();
const { usernameValidator, emailValidator, passwordValidator } = authValidator;
const { checkExistingUser, validatePassword } = checkDuplicate;

router.post(
  '/auth/signup',
  usernameValidator,
  emailValidator,
  passwordValidator,
  validate,
  checkExistingUser,
  UserController.createAccount
);

router.post(
  '/auth/login',
  emailValidator,
  passwordValidator,
  validate,
  validatePassword,
  UserController.login
);

router.post('/auth/logout', UserController.logOut);


export default router;
