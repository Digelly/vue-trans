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
      'multiple_choice': '{0}no apples|{1}one apple|]1, Inf]%count% apples',
      'multiple_choice_with_param': '{0}no %param%|{1}one %param%|]1, Inf]%count% %param%s'
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
    it('Should be able to parse multiple choices', () => {
      expect(trans('multiple_choice', { count: '1' }))
        .toBe('one apple');
      expect(trans('multiple_choice', { count: '0' }))
        .toBe('no apples');
      expect(trans('multiple_choice', { count: '3' }))
        .toBe('3 apples');
    });
    it('Should be able to parse multiple choices with context parameters', () => {
      expect(trans('multiple_choice_with_param', { count: '3', param: 'pear' }))
        .toBe('3 pears');
    });
  });  
});
