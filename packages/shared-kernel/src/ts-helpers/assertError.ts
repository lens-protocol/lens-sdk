import { InvariantError } from './invariant';

interface IErrorWithCode<T> extends Error {
  readonly code: T;
}

export function assertError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new InvariantError(
      `Invalid error type. Received ${typeof error}, expected instance of Error`,
    );
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
