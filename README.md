# Jest Sandbox

## Test Cases

### 1. [Mocking Inner Functions](#mocking-inner-functions)

### 2. [Mocking Extended Class Methods](#mocking-extended-class-methods)

### 3. [Mocking Objects](#mocking-objects)

## Instructions

```
# Install modules
npm i
# Run unit tests
npm test
```

## Mocking Inner Functions

### Source Code

```javascript
// addHelper.js
function doAdd(c, d) {
  return c + d;
}

// add.js
function add(a, b) {
  return doAdd(a, b);
}
```

### Test Code

```javascript
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

    expect(addModule.add(100, 200)).toEqual(11);
    expect(helperModule.doAdd).toBeCalled();
  });
});
```

## Mocking Extended Class Methods

### Source Code

```javascript
// BaseClass.js
class BaseClass {
  constructor() {
    this.foo = 'bar';
  }

  getFoo() {
    return this.foo;
  }
}

// ExtendedClass.js
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

### Test Code

```javascript
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

## Mocking Objects

### Source Code

```javascript
// myOtherModule.js
const myOtherModule = {
  foo: 'bar',
};

// myModule.js
const myOtherModule = require('./myOtherModule');

const performAction = () => {
  // should console log "bar"
  console.log(myOtherModule.foo);
};
```

### Test Code

```javascript
jest.mock('../src/mock-object/myOtherModule', () => {
  return {
    foo: 'foo',
  };
});

describe('myModule', () => {
  it('performAction should console log myOtherModule.foo as "foo"', () => {
    jest.spyOn(console, 'log').mockImplementation();

    myModule.performAction();

    expect(console.log).toBeCalledWith('foo');
  });
});
```
