/**
 * @module @theroyalwhee0/liketype
 * @file Duck-type checks for Javascript and Typescript.
 * @version v0.0.1
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @copyright Copyright 2021 Adam Mill
 * @license Apache-2.0
 */

import { isObject, isString, isFunction } from '@theroyalwhee0/istype';

/**
 * Like an Error?
 * @param {unknown} value The value to check.
 * @returns {boolean} The results.
 */
export function likeError<T extends Error>(value: unknown): value is T & boolean {
  return !!(
    (
      value instanceof Error
    ) || (
      isObject(value) &&
      isFunction(value.constructor) &&
      isString(value.message) &&
      isString(value.stack) &&
      /Error/i.test('' + value.constructor)
    )
  );
}

/**
 * Like a Promise?
 * @param {unknown} value The value to check.
 * @returns {boolean} The results.
 */
export function likePromise<T>(value: unknown): value is Promise<T> & boolean {
  return !!(
    (
      value instanceof Promise
    ) || (
      isObject(value) &&
      isFunction(value.then) &&
      isFunction(value.catch)
    )
  );
}
