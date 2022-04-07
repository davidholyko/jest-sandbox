const BaseClass = require('../src/mock-super-methods/BaseClass');
const ExtendedClass = require('../src/mock-super-methods/ExtendedClass');

describe('ExtendedClass', () => {
  describe('getFoo', () => {
    it('should return this.foo + this.foo', () => {
      const foo = 'foo';
      const myExtendedClass = new ExtendedClass();
      myExtendedClass.foo = foo;
      const myFoo = myExtendedClass.getFoo();

      expect(myFoo).toEqual(foo + foo);
    });

    it('should get value from BaseClass.foo', () => {
      const interceptedValue = 10000;
      const foo = 'foo';
      jest.spyOn(BaseClass.prototype, 'getFoo').mockReturnValue(interceptedValue);

      const myExtendedClass = new ExtendedClass();
      myExtendedClass.foo = foo;
      const myFoo = myExtendedClass.getFoo();

      expect(myFoo).toEqual(interceptedValue + foo);
    });
  });
});
