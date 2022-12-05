/**
 * Thrown exceptions are historically difficult to trace. They require implicit knowledge
 * of the implementation details of the code that might throw expections. This might go
 * several layers down and lead to tight coupling between modules.
 *
 * There are good reasons to leave thrown expections only for exceptional (i.e. unexpected) failure
 * scenarios and model known failure modes in way that allows traditional control flow.
 *
 * Result<T, E> is a minimalistic implementation of a value that can be a "success" or a "failure".
 * It borrows from what done in other modern languages (i.e. Rust, Kotlin, Swift, etc.).
 * It's type safe and promotes exhaustive error handling.
 *
 * See:
 *   - https://wiki.c2.com/?AvoidExceptionsWheneverPossible
 *   - https://developer.apple.com/documentation/swift/result
 *   - https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/
 *
 * Alternatives:
 *   - https://github.com/everweij/typescript-result
 *   - https://github.com/supermacro/neverthrow
 *   - https://github.com/badrap/result
 */

import { Narrow } from './ts-helpers/types';

class Success<T, E> {
  public constructor(public readonly value: T) {}

  public isSuccess(): this is Success<T, E> {
    return true;
  }

  public isFailure(): this is Failure<T, E> {
    return false;
  }

  unwrap(): T {
    return this.value;
  }
}

class Failure<T, E> {
  public constructor(public readonly error: E) {}

  public isSuccess(): this is Success<T, E> {
    return false;
  }

  public isFailure(): this is Failure<T, E> {
    return true;
  }

  unwrap(): never {
    throw this.error;
  }
}

export interface IEquatableError<T extends string = string, P = Narrow<T>> {
  name: P;
}

export type Result<T, E extends IEquatableError> = Success<T, E> | Failure<T, E>;

export type PromiseResult<T, E extends IEquatableError> = Promise<Result<T, E>>;

export function success<T extends void, E>(): Success<T, E>;
export function success<T, E>(value: T): Success<T, E>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function success<T, E>(value: any = undefined): Success<T, E> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new Success(value);
}

export const failure = <T, E extends IEquatableError>(error: E): Failure<T, E> =>
  new Failure(error);

export function isResult(v: unknown): v is Result<unknown, IEquatableError> {
  return v instanceof Success || v instanceof Failure;
}
