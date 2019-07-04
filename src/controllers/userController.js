import auth from '../middleware/Auth';
import { Blacklist, User } from '../db/models';

/**
 * @description This class handles user requests
 * @class UserController
 */
class UserController {
  /**
 *
 * @static
 * @param {object} request
 * @param {object} response
 * @returns {object} response
 * @memberof UserController
 */
  static async login(request, response) {
    const { email } = request.body;
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return response.status(404).json({
          status: 400,
          error: 'User not found',
        });
      }
      const { id } = user;
      const userToken = auth.authenticate(id);
      if (user) {
        return response.status(200).json({
          status: 200,
          message: 'User successfully Logged In',
          data: userToken
        });
      }
      return response.status(404).json({
        status: 404,
        message: 'User Not Found',
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  /**
  *
  *@description Logout a user
  * @static
  * @param {object} request
  * @param {object} response
  * @returns {object} response
  * @memberof UserController
  */
  static async logOut(request, response) {
    const token = request.headers.authorization || request.body || request.query;
    try {
      const createdToken = await Blacklist.create({
        token
      });
      return response.status(200).json({
        status: 200,
        message: 'User successfully Logged Out',
        data: createdToken
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
     *
     * @param {object} request the request body
     * @param {object} response the response body
     * @returns {object} response
     * @memberof UserController
     */
  static async updateProfile(request, response) {
    try {
      const {
        firstname, lastname, email, username, bio,
      } = request.body;

      const avatar = request.file;
      const userId = request.user;

      let avatarValue;

      if (avatar) avatarValue = avatar.url;

      const userDetails = {
        firstname,
        lastname,
        email,
        username,
        bio,
        image_url: avatarValue,
      };

      const where = {
        id: userId,
      };

      const userData = await User.findOne({ where });

      if (!userData) {
        return response.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }

      await userData.update(userDetails, { where });

      return response.status(200).json({
        status: 200,
        user: userDetails,
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return response.status(400).json({
          status: 400,
          error: 'User with that username or email already exists',
        });
      }
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

export default UserController;
