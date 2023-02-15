require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require('cors');
const ErrorHandler = require('./middleware/ErrorHandler');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

// Import routes.
const AuthRoutes = require('./router/auth.routes');
const BlogRoutes = require('./router/blog.routes');
const CommentRoutes = require('./router/comment.routes');
const OtherRoutes = require('./router/other.routes');

const { API_PORT, APP_NAME } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(methodOverride());

app.get('/', (req, res) => {
  return res.status(200).json({ message: `Welcome to ${APP_NAME}!!` });
});

app.use(AuthRoutes);
app.use('/blog/', BlogRoutes);
app.use('/comment/', CommentRoutes);
app.use(OtherRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: 'Not found.' });
})
app.use(ErrorHandler);
app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}!!`))