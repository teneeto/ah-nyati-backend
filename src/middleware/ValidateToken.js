/**
 *
 *
 * @class Validate
 */
class ValidateToken {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} res
   * @memberof ValidateToken
   */
  static async checkToken(req, res, next) {
    const { token } = req.headers || req.body || req.query;

    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token is required',
      });
    }
    next();
  }
}

export default ValidateToken;
