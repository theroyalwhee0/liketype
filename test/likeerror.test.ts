import { likeError } from '../src/index.js';

/**
 * Inherit from Error.
 */
class MyFailure extends Error {
  // NOTE: No 'Error' in name.
}
class FatalException extends MyFailure {
}

/**
 * Pretend to be an Error.
 */
class PretendError {

  msg: string;

  constructor(msg?: string) {
    this.msg = msg || '';
  }

  get stack() {
    return ' 0:0 Beyond the end of the sidewalk.';
  }

  get message() {
    return this.msg;
  }
}

test('likeError should be a function', () => {
  expect(likeError).toBeInstanceOf(Function);
  expect(likeError.length).toBe(1);
});

test('should type-guard as error', () => {
  const value: unknown = new Error('Hello');
  if (likeError(value)) {
    expect(value.message).toBe("Hello");
  } else {
    // expect(value.message).toBe("Hello");  // This shouldn't compile.
    fail('Should have been an error.');
  }
});

test.each([
  new Error(),
  new Error(''),
  new Error('Painting'),
  new MyFailure(),
  new MyFailure(''),
  new MyFailure('Table'),
  new FatalException(),
  new FatalException(''),
  new FatalException('Speaker'),
  new PretendError(),
  new PretendError(''),
  new PretendError('Chair'),
])('likeError should identify %p as an Error', (item) => {
  expect(likeError(item)).toBe(true);
});


test.each([
  // Various Primatives.
  null, undefined, 0, '',
  // Objects.
  {}, new Date(), {
    stack: '',
    message: '',
  },
  // Error object.
  Error,
])('likeError should not identify %p as an Error', (item) => {
  expect(likeError(item)).toBe(false);
});
