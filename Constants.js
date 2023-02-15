require('dotenv').config()

const ALLOWED_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
const ALLOWED_CATEGORIES = [0, 1, 2, 3, 4, 5, 6];
const BASE_URL = 'http://localhost:' + process.env.API_PORT + '/';
module.exports = {
  ALLOWED_EXTENSIONS,
  ALLOWED_CATEGORIES,
  BASE_URL
}