# Jest Sandbox

## Instructions

```
# Install modules
npm i
# Run unit tests
npm test
```

## Mocking Inner Functions

```javascript
const { doAdd } = require('./addHelper');

function add(a, b) {
  return doAdd(a, b);
}
```

```javascript
const addModule = require('../src/mock-inner-functions/add');
const helperModule = require('../src/mock-inner-functions/addHelper');

// addHelper mock gets hoisted to the top
// and is the first thing that runs
jest.mock('../src/mock-inner-functions/addHelper');

describe('add', () => {
  beforeEach(() => {
    // slight work around to restore doAdd functionality
    jest.spyOn(helperModule, 'doAdd').mockImplementation((a, b) => a + b);
  });

  it('should call doAdd', () => {
    // hook into doAdd helper method and intercept its return value
    jest.spyOn(helperModule, 'doAdd').mockReturnValue(11);

    expect(addModule.add()).toEqual(11);
    expect(helperModule.doAdd).toBeCalled();
  });
});
```

## Mocking Extended Class Methods

```javascript
class BaseClass {
  constructor() {
    this.foo = 'bar';
  }

  getFoo() {
    return this.foo;
  }
}

class ExtendedClass extends BaseClass {
  constructor() {
    super();
  }

  getFoo() {
    const foo = super.getFoo();
    return foo + this.foo;
  }
}
```

```javascript
const BaseClass = require('../src/mock-super-methods/BaseClass');
const ExtendedClass = require('../src/mock-super-methods/ExtendedClass');

describe('ExtendedClass', () => {
  describe('getFoo', () => {
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
```
