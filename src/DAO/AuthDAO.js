const { throwError } = require('../utils/Common');

class AuthDAO {

  // async findUserByEmail(collection, email) {
  //   let user = await db.collection(collection)
  //     .where('email', '==', email)
  //     .limit(1)
  //     .get();
  //   if (user.empty) throwError(401, "Credentials Invalid");
  //   return user.docs[0];
  // }

}

module.exports = AuthDAO;
