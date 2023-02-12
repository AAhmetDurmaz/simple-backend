exports.protected_route = (req, res, next) => {
  try {
    return res.status(200).json({ message: 'Welcome to protected route!' });
  } catch (err) {
    next(err);
  }
}

exports.error_handler_test = (req, res, next) => {
  try {
    const error = new Error();
    error.statusCode = 500;
    error.message = 'Error handler test.';
    throw error;
  } catch (err) {
    next(err);
  }
}