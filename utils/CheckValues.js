const CheckValues = (keys, body) => {
  body = Object.keys(body);
  for (let i = 0; i < keys.length; i++) {
    if (body.includes(keys[i])) {
      continue;
    } else {
      let error = new Error('Missing parameter.');
      error.statusCode = 400;
      throw error;
    }
  }
  return true;
}

module.exports = CheckValues;