import trans from '../src/filter';

/* eslint-disable */

// Test suite with no resource object
describe('No global translations object provided', () => {

  it('Should return the passed key if it is undefined', () => {
    expect(trans('undefined_key')).toBe('undefined_key');
  });

});

// Test suite with global resource object.
describe('Global translations object provided', () => {

  // Providing a set of translation keys with corresponding value.
  beforeEach(() => {
    window.translations = {
      'existing_key': 'existing key',
      'context_key': 'context: %value%',
      'multiple_context_keys': 'context: %value% %value_two%',
      'multiple_similar_keys': 'context: %value% %value%',
    };
  });

  it('Should return the passed key if it is undefined', () => {
    expect(trans('undefined_key')).toBe('undefined_key');
  });

  it('Should return the value if key exists', () => {
    expect(trans('existing_key')).toBe('existing key');
  });

  // Test on parsing translations with context
  describe('translations with context', () => {

    it('Should return the unparsed translation if no context is provided', () => {
      expect(trans('context_key')).toBe('context: %value%');
    });

    it('Should return the unparsed translations if the context is empty', () => {
      expect(trans('context_key', {})).toBe('context: %value%');
    });

    it('Should return the parsed translations a context is provided', () => {
      expect(trans('context_key', { value: 'test' })).toBe('context: test');
    });

    it('Should be able to parse multiple deferring context parameters', () => {
      expect(trans('multiple_context_keys', { value: 'test', value_two: 'test_two' }))
        .toBe('context: test test_two');
    });

    it('Should be able to parse multiple similar context parameters', () => {
      expect(trans('multiple_similar_keys', { value: 'test' }))
        .toBe('context: test test');
    });
  });  
});
