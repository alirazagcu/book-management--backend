const { throwError } = require('../utils/Common');
const { decrypt, generateJWT } = require('../utils/AuthUtils');
const AuthDAO = require('../dao/AuthDAO');
const authDAO = new AuthDAO();

class AuthService {

  async getTokens(payload) {
    // let { email, password } = payload;
    // let userType = payload.user_type;
    // let collection = userType + 's';
    // let user = await authDAO.findUserByEmail(collection, email);
    // if (!user.get('password')) throwError(401, "Credentials Invalid");
    // let decryptedPassword = decrypt(user.get('password'));
    // if (password !== decryptedPassword) {
    //   throwError(401, "Credentials Invalid");
    // }
    // let token = await generateJWT(user.get('id'), user.get('email'), user.get('number'), userType);
    // let refreshToken = await generateRefreshJWT(user.get('id'), user.get('email'), user.get('number'), 
    //   userType);
    // return { token, refreshToken };
  }
}

module.exports = AuthService;
