// third-party libraries
import jwt from 'jsonwebtoken';

const auth = {
  /**
   * @static
   * @param {object} user
   * @description Generates token for user
   * @return {string} string
   */
  authenticate(user) {
    return jwt.sign(
      {
        user,
      },
      process.env.SECRET,
      {
        expiresIn: '24h'
      }
    );
  }
};

export default auth;
