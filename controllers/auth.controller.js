const { CreateToken, GetUser } = require('../utils/token');
const Crypto = require('crypto');

// Import models.
const User = require('../model/User');

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!(name && username && email && password)) {
      return res.status(400).json({ message: 'Missing parameter.' })
    }

    const SearchUser = await User.findOne({ email: email });
    if (SearchUser) {
      return res.status(409).json({ message: 'User already exists. Please login.' })
    }

    const EncryptedPass = Crypto.createHash('sha256').update(password).digest('base64');
    const user = await User.create({
      name: name,
      username: username,
      email: email.toLowerCase(),
      password: EncryptedPass
    });
    delete user.password;
    const token = CreateToken(user);
    return res.status(200).json({ message: 'User successfully registered.', token: token });

  } catch (err) {
    next(err);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) return res.status(400).json({ message: 'Missing parameter.' })
    const EncryptedPass = Crypto.createHash('sha256').update(password).digest('base64');
    const FindUser = await User.findOne({
      email: email,
      password: EncryptedPass
    });
    if (!FindUser) return res.status(401).json({ message: 'E-mail or password incorrect.' })
    delete FindUser.password;
    const token = CreateToken(FindUser);
    return res.status(200).json({ message: 'Successfully logged in.', token: token });
  } catch (err) {
    next(err);
  }
}

exports.whoami = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const UserData = GetUser(token);
    return res.status(200).json(UserData);
  } catch (err) {
    next(err);
  }
}