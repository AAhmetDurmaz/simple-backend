// TODO(Ahmet): Convert project to f*cking TypeScript.
function DeleteKeys(obj, keys /* KEYS: string array */) {
  if (Array.isArray(obj)) {
    for (let j = 0; j < obj.length; j++) {
      obj[j] = obj[j].toObject();
      for (let i = 0; i < keys.length; i++) {
        delete obj[j][keys[i]]
      }
    }
    return obj;
  }
  for (let i = 0; i < keys.length; i++) {
    delete obj[keys[i]]
  }
  return obj;
}

module.exports = {
  DeleteKeys,
}