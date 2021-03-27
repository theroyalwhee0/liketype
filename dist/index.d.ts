/**
 * @module @theroyalwhee0/liketype
 * @file Duck-type checks for Javascript and Typescript.
 * @version v0.0.1
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @copyright Copyright 2021 Adam Mill
 * @license Apache-2.0
 */
/**
 * Like an Error?
 * @param {unknown} value The value to check.
 * @returns {boolean} The results.
 */
export declare function likeError<T extends Error>(value: unknown): value is T & boolean;
/**
 * Like a Promise?
 * @param {unknown} value The value to check.
 * @returns {boolean} The results.
 */
export declare function likePromise<T>(value: unknown): value is Promise<T> & boolean;
