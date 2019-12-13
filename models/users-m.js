const connection = require("../db/connection");

fetchUserByUsername = username => {
  return connection("users")
    .where("username", "=", username)
    .then(result => {
      if (!result.length)
        return Promise.reject({ status: 404, msg: "username does not exist" });
      else {
        return result[0];
      }
    });
};

module.exports = fetchUserByUsername;
