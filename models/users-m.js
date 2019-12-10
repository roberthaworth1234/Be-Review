const connection = require('../db/connection');

fetchUserByUsername = (username) => {
  return connection('users').where('username', "=", username).returning('*').then((result) => {
    if (!result.length) return Promise.reject({ status: 404, msg: "username does not exist" })
    else {
      return result
    }
  })
}



module.exports = fetchUserByUsername;