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
jest.mock('./addHelper');

// ...

it('should call doAdd', () => {
  // hook into doAdd helper method and intercept its return value
  jest.spyOn(helperModule, 'doAdd').mockReturnValue(11);

  expect(addModule.add()).toEqual(11);
  expect(helperModule.doAdd).toBeCalled();
});
```
