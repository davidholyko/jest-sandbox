const myOtherModule = require('./myOtherModule');

const performAction = () => {
  // should console log "bar"
  console.log(myOtherModule.foo);
};

module.exports = { performAction };
