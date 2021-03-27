import { likePromise } from '../src/index.js';

/**
 * Inherit from Promise.
 */
class MyPromise<T> extends Promise<T>{
  get mine() {
    return true;
  }
}

/**
 * Pretend to be an Promise.
 */
class PretendPromise<T> {

  value:T;

  constructor(value?:T) {
    this.value = value || undefined;
  }

  then() {
    return this;
  }

  catch() {
    return this;
  }
}

test('likePromise should be a function', () => {
  expect(likePromise).toBeInstanceOf(Function);
  expect(likePromise.length).toBe(1);
});

test('should type-guard as error', () => {
  const value:unknown = new Promise((resolve) => { resolve('Shoes'); });
  if(likePromise(value)) {
    expect(typeof value.then).toBe('function');
  } else {
    // expect(typeof value.then).toBe('function'); // This shouldn't compile.
    fail('Should have been a promise.');
  }
});

test.each([
  new Promise<void>(()=>{ false }),
  new Promise<number>((resolve)=>{ resolve(10); }),
  new MyPromise<string>((resolve)=>{ resolve('Ring'); }),
  new PretendPromise<string>(),
  new PretendPromise<string>('Speakers'),
])('likePromise should identify %p as an Error', async (item) => {
    await expect(likePromise(item)).toBe(true);
});


test.each([
  // Various Primatives.
  null, undefined, 0, '',
  // Objects.
  {}, new Date(), {
    then: 1,
    catch: 2,
  },
  // Promise object.
  Promise, MyPromise, PretendPromise,
])('likePromise should not identify %p as an Promise', (item) => {
  expect(likePromise(item)).toBe(false);
});
