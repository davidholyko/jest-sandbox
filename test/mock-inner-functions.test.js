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

  it('should add two numbers correctly', () => {
    const result = addModule.add(1, 2);
    expect(result).toBe(3);
  });

  it('should call doAdd', () => {
    // hook into doAdd helper method and intercept its return value
    jest.spyOn(helperModule, 'doAdd').mockReturnValue(11);

    expect(addModule.add()).toEqual(11);
    expect(helperModule.doAdd).toBeCalled();
  });
});
