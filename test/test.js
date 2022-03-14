const addModule = require('../src/add');
const helperModule = require('../src/addHelper');

// addHelper mock gets hoisted to the top
// and is the first thing that runs
jest.mock('../src/addHelper');

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
