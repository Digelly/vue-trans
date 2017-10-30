import trans from '../src/filter';

/* eslint-disable */

// Test suite with no resource object
describe('No translation object provided', () => {

  it('Should just return the passed key', () => {
    expect(trans('some_key')).toBe('some_key');
  });

});

// Test suite with global resource object.
describe('Global translation object as resource', () => {

  // Providing a set translation keys with corresponding value.
  beforeEach(() => {
    window.translations = {
      'some_key': 'existing key',
    };
  });


  it('Should return the value if key exists', () => {
    expect(trans('some_key')).toBe('existing key');
  });
});
