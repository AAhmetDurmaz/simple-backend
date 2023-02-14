require('dotenv').config()

const ALLOWED_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
const BASE_URL = 'http://localhost:' + process.env.API_PORT + '/';
module.exports = {
  ALLOWED_EXTENSIONS,
  BASE_URL
}