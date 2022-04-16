const myModule = require('../src/mock-object/myModule');

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

  it('performAction should console log myOtherModule.foo as "bar', () => {
    jest.mock('../src/mock-object/myOtherModule').restoreAllMocks();
    jest.spyOn(console, 'log').mockImplementation();

    myModule.performAction();

    expect(console.log).toBeCalledWith('foo');
  });
});
