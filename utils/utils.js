// TODO(Ahmet): Convert project to f*cking TypeScript.
function DeleteKeys(obj, keys /* KEYS: string array */) {
  for (let i = 0; i < keys.length; i++) {
    delete obj[keys[i]]
  }
  return obj;
}

module.exports = {
  DeleteKeys,
}