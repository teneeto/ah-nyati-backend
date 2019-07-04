import { check } from 'express-validator';
import displayErrors from './errorMessages';

const profileChecker = [
  check('firstname').optional().isAlpha().trim()
    .withMessage('First name can only contain letters'),
  check('lastname').optional().isAlpha().trim()
    .withMessage('Last name can only contain letters'),
  check('email').optional().isEmail().trim()
    .withMessage('Input a valid email address'),
  check('bio').optional().isLength({ max: 150 })
    .withMessage('Bio cannot exceed 150 characters'),
  displayErrors,
];

export default profileChecker;
