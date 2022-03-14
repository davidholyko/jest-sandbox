const { doAdd } = require('./addHelper');

function add(a, b) {
  return doAdd(a, b);
}

module.exports = {
  add,
};
