import passwordHash from 'password-hash';
import Auth from '../helpers/helpers';
import { Blacklist, User } from '../db/models';
import Template from '../helpers/mail/MailTemplate';
import Mailer from '../helpers/mail/Mailer';

const { generateToken } = Auth;
const { sendMail } = Mailer;

/**
 *
 *
 * @class AuthController
 */
class AuthController {
  /**
  *
  * @constructor
  * @description signup a user
  * @static
  * @param {object} req
  * @param {object} res
  * @memberof AuthController
  */
  static async createAccount(req, res) {
    try {
      const { userName, email, password } = req.body;
      const hashedpassword = passwordHash.generate(password);
      const values = { userName, email, password: hashedpassword };
      const result = await User.create(values);
      const { id } = result;
      const token = await generateToken({ id, userName, email });

      const user = {
        id: result.id,
        userName: result.userName,
        email: result.email,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      };

      const url = `${req.protocol}://${req.get('host')}/api/v1/auth/signup/${token}`;
      const message = Template.resetEmail(url);
      const subject = 'Welcome to Authors Haven';
      await sendMail({ to: email, subject, html: message });

      return res.status(201).json({
        status: 201,
        message: 'User signup successful',
        data: [{ token, user }],
      });
    } catch (err) {
      return res.status(500).json({ error: true, message: 'Internal Server error' });
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
     *
     *@description login a user
     * @static
     * @param {*} req
     * @param {*} res
     * @returns token
     * @memberof UserController
     */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await User.findOne({ where: { email } });
      if (result) {
        if (passwordHash.verify(password, result.password)) {
          const { id } = result;
          const token = await generateToken({ id, email });

          const user = {
            id: result.id,
            userName: result.userName,
            email: result.email,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
          };

          return res.status(200).json({
            status: 200,
            message: 'User Login successful',
            data: [{ token, user }]
          });
        }
        return res.status(401).json({ error: true, message: 'Invalid email or password' });
      }
      return res.status(401).json({ error: true, message: 'Invalid email or password' });
    } catch (err) {
      return res.status(500).json({ error: true, message: 'Internal Server error' });
    }
  }


  /**
  *
  *@description Logout a user
  * @static
  * @param {object} req
  * @param {object} res
  * @returns {object} res
  * @memberof AuthController
  */
  static async logOut(req, res) {
    const { token } = req.headers || req.body || req.query;
    try {
      const createdToken = await Blacklist.create({
        token
      });
      return res.status(200).json({
        status: 200,
        message: 'User successfully Logged Out',
        data: createdToken
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error,
      });
    }
  }
}

export default AuthController;
