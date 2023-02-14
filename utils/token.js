const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = process.env;

const CreateToken = (UserData) => {
  const token = jwt.sign(
    UserData.toObject(),
    JWT_TOKEN,
    { expiresIn: '30d' }
  );
  return token;
}

function GetToken(req) {
  return req.headers.authorization.split(' ')[1].toString();
}

function GetUser(token) {
  const UserData = jwt.verify(token, JWT_TOKEN);
  delete UserData.password;
  return UserData;
}

module.exports = { CreateToken, GetUser, GetToken }