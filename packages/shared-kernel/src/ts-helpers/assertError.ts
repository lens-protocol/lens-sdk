import isObject from 'lodash/isObject';

interface IErrorWithCode<T> extends Error {
  readonly code: T;
}

export function assertError(error: unknown): asserts error is Error {
  // why not `error instanceof Error`? see https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1099
  // eslint-disable-next-line no-prototype-builtins
  if (!isObject(error) || !Error.prototype.isPrototypeOf(error)) {
    throw error;
  }
}

export function assertErrorWithCode<T>(error: unknown): asserts error is IErrorWithCode<T> {
  // eslint-disable-next-line no-prototype-builtins
  if (!(error instanceof Error && error.hasOwnProperty('code'))) {
    throw error;
  }
}

interface IErrorWithReason<T> extends Error {
  readonly reason: T;
}

export function assertErrorWithReason<T>(error: unknown): asserts error is IErrorWithReason<T> {
  // eslint-disable-next-line no-prototype-builtins
  if (!(error instanceof Error && error.hasOwnProperty('reason'))) {
    throw error;
  }
}
