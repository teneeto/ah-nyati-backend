import { User } from '../db/models';
import { generateToken, hashPassword } from '../helpers/helpers';

/**
 *@description - class
  * @param {object} req
  * @param {object} res
  * @returns {object} response
  */
export default class socialController {
  /**
 *@description - class
  * @param {object} req
  * @param {object} res
  * @returns {object} response
  */
  static async socialUser(req, res) {
    try {
      const userData = req.authInfo;
      if (userData.emails === undefined) {
        return res.status(400).send('Email not found');
      }
      const newPassword = Math.random().toString(36).slice(-10);
      const password = hashPassword(newPassword);


      let firstName, lastName;
      const { displayName } = userData;
      if (displayName) {
        [firstName, lastName] = displayName.split(' ');
      } else {
        firstName = userData.name.familyName;
        lastName = userData.name.givenName;
      }

      const user = await User.findOrCreate({
        where: { email: userData.emails[0].value },
        defaults: {
          firstName,
          lastName,
          password,
          isVerified: false,
          bio: 'local man',
          token: 'hgnvhmgknjgjgvhmbn',
          email: userData.emails[0].value,
          imageUrl: userData.photos[0].value,
          social: userData.provider
        }
      });

      if (!user) {
        return res.status(404).send('user not found');
      }

      const {
        id,
        firstName: firstname,
        lastName: lastname,
        email,
        bio,
        image_url: image,
      } = user[0].dataValues;

      const token = generateToken({
        id,
        firstname,
        lastname,
        email,
        bio,
        image_url: image,
      }, '1d');

      return res.status(200).json({
        message: 'successful',
        token
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
}
