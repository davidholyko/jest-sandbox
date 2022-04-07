const BaseClass = require('./BaseClass');

class ExtendedClass extends BaseClass {
  constructor() {
    super();
  }

  getFoo() {
    const foo = super.getFoo();
    return foo + this.foo;
  }
}

module.exports = ExtendedClass;
