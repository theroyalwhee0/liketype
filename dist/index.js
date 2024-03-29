"use strict";
/**
 * @module @theroyalwhee0/liketype
 * @file Duck-type checks for Javascript and Typescript.
 * @version v0.0.2
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @copyright Copyright 2021 Adam Mill
 * @license Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePromise = exports.likeError = void 0;
const istype_1 = require("@theroyalwhee0/istype");
/**
 * Like an Error?
 * @param {unknown} value The value to check.
 * @returns {boolean} The results.
 */
function likeError(value) {
    return !!((value instanceof Error) || ((0, istype_1.isObject)(value) &&
        (0, istype_1.isFunction)(value.constructor) &&
        (0, istype_1.isString)(value.message) &&
        (0, istype_1.isString)(value.stack) &&
        /Error/i.test('' + value.constructor)));
}
exports.likeError = likeError;
/**
 * Like a Promise?
 * @param {unknown} value The value to check.
 * @returns {boolean} The results.
 */
function likePromise(value) {
    return !!((value instanceof Promise) || ((0, istype_1.isObject)(value) &&
        (0, istype_1.isFunction)(value.then) &&
        (0, istype_1.isFunction)(value.catch)));
}
exports.likePromise = likePromise;
//# sourceMappingURL=index.js.map