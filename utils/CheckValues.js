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

const CheckFiles = (files) => {
  if (typeof (files) === 'object') {
    if (files.length < 1) {
      let error = new Error('Missing parameter.');
      error.statusCode = 400;
      throw error;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].path === '') {
        let error = new Error('Missing parameter.');
        error.statusCode = 400;
        throw error;
      }
    }
  } else {
    if (file.path === '') {
      let error = new Error('Missing parameter.');
      error.statusCode = 400;
      throw error;
    }
  }
}
module.exports = { CheckValues, CheckFiles };