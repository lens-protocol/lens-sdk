import { invariant } from './ts-helpers/invariant';
import { Narrow } from './ts-helpers/types';

/**
 * A `Success<T, E>` represents a successful computation that returns a value of type `T`.
 *
 * `E` in `Success<T, E>` is the type of the error that would have been returned in case of failure.
 * It's present only to allow type safety of the `isFailure` method.
 *
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 * @typeParam T - the success value type
 */
class Success<T> {
  /** @internal */
  public constructor(public readonly value: T) {}

  public isSuccess(): this is Success<T> {
    return true;
  }

  public isFailure(): this is Failure<unknown> {
    return false;
  }

  unwrap(): T {
    return this.value;
  }
}

/**
 * A `Success<T, E>` represents a successful computation that returns a value of type `T`.
 *
 * `T` in `Failure<T, E>` is the type of the value that would have been returned in case of success.
 * It's present only to allow type safety of the `isSuccess` method.
 *
 * @sealed
 * @privateRemarks DO NOT EXPORT, see type export later on
 * @typeParam E - the failure error type
 */
class Failure<E> {
  /** @internal */
  public constructor(public readonly error: E) {}

  public isSuccess(): this is Success<unknown> {
    return false;
  }

  public isFailure(): this is Failure<E> {
    return true;
  }

  unwrap(): never {
    throw this.error;
  }
}

export type { Success, Failure };

/**
 * An `IEquatableError` is an error that can be compared by name.
 *
 */
export interface IEquatableError<T extends string = string, P = Narrow<T>> {
  name: P;
}

/**
 * A `Result` type represents either `Success` or `Failure`.
 *
 * **TL;DR**
 *
 * `Result` is a minimalist implementation of a value that can be a "success" or a "failure".
 * It borrows from what done in other modern languages (i.e. Rust, Kotlin, Swift, etc.).
 *
 * The Lens SDK adopts this pattern in order to:
 * - be explicit about the known failure scenarios of a task,
 * - provide a way for consumers to perform exhaustive error handling,
 * - makes control flow easier to reason about.
 *
 * @remarks
 *
 * You might be familiar with the `Either` type from functional programming. The `Result` type
 * could be seen as a more specific version of `Either` where the left side is reserved for
 * success scenarios and the right side is reserved for known failure scenarios.
 *
 * Think of failure scenarios as alternative outcomes of a given task that although not the "happy path",
 * are still legitimate results for the task within the boundary of a correct usage of the SDK.
 *
 * In promoting exhaustive error handling, the Lens SDK makes it easier to evolve your code
 * when a new error case is added or a case is removed.
 * For example after a Lens SDK upgrade you can simply run the TS compiler to figure out where you
 * need to handle the new error cases, or even better, it guides you to remove obsolescent code
 * where an error case is no longer possible. This is virtually impossible with a `try/catch` approach.
 *
 * Thrown exceptions are historically difficult to trace. They require implicit knowledge
 * of the implementation details of the code that might throw exceptions. This might go several
 * layers down and leads to tight coupling between modules.
 *
 * The Lens SDK still throws exceptions where the error is not a "normal execution scenario".
 * These are considered real "exceptional circumstances" and not alternative outcomes and it's up to the consumer to `try/catch` them.
 *
 * An example of errors that are thrown by the SDK is {@link InvariantError}. They are often thrown as result of a misuse of the SDK.
 * By throwing them we want to fail fast so the consumer can fix the issue as soon as possible.
 * Specifically for `InvariantError`, there is no need to code defensively against these errors. Just rectify the coding issue and move on.
 *
 * @example
 * Control flow
 * ```ts
 * const result: Result<number, RangeError> = doSomething();
 *
 * if (result.isFailure()) {
 *   // because of the `isFailure` check above, TS knows that `result` is a `Failure<RangeError>` here
 *   console.log(result.error); // result.error gets narrowed to `RangeError`
 *
 *   return; // early return
 * }
 *
 * // because of the `isFailure` check above and the early return, TS knows that `result` is a `Success<number>` here
 * console.log(result.value); // result.value gets narrowed to `number`
 * ```
 *
 * @example
 * Exhaustive error handling
 *
 * Given a result type like the following:
 *
 * ```ts
 * const result: Result<number, PendingSigningError | WalletConnectionError> = doSomething();
 * ```
 * You can use a function with a `switch` statement to perform exhaustive error handling:
 * ```ts
 * function format(failure: Failure<PendingSigningError | WalletConnectionError>): string {
 *   switch (failure.error.name) {
 *     case 'PendingSigningError':
 *       return 'Please sign the transaction';
 *       break;
 *     case 'WalletConnectionError':
 *       return 'Please connect your wallet and try again';
 *       break;
 *   }
 *   // any code after the switch statement is unreachable
 * }
 * ```
 * The example above assumes `allowUnreachableCode: false` in your `tsconfig.json`.
 *
 * An even more robust way to perform exhaustive error handling with a `switch` is to use the `never` type: see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking | exhaustiveness checking}.
 *
 * @see https://wiki.c2.com/?AvoidExceptionsWheneverPossible
 * @see https://developer.apple.com/documentation/swift/result
 * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/
 * @see https://the-guild.dev/blog/graphql-error-handling-with-fp#monads-to-the-rescue
 *
 * @typeParam T - the success value type
 * @typeParam E - the failure error type
 */
export type Result<T, E extends IEquatableError> = Success<T> | Failure<E>;

/**
 * A `PromiseResult` is a convenience type alias that represents either a {@link Result} in the context of asynchronous tasks.
 *
 * @typeParam T - the success value type
 * @typeParam E - the failure error type
 */
export type PromiseResult<T, E extends IEquatableError> = Promise<Result<T, E>>;

/**
 * @internal
 */
export function success(): Success<void>;
export function success<T>(value: T): Success<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function success<T>(value: any = undefined): Success<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new Success(value);
}

/**
 * @internal
 */
export const failure = <E extends IEquatableError>(error: E): Failure<E> => new Failure(error);

/**
 * Ensures the `Result<T, E>` is a `Success<T>`.
 */
export function assertSuccess<T>(result: Result<T, IEquatableError>): asserts result is Success<T> {
  invariant(result.isSuccess(), 'Expected a success result');
}

/**
 * Ensures the `Result<T, E>` is a `Failure<E>`.
 */
export function assertFailure<T, E extends IEquatableError>(
  result: Result<T, E>,
): asserts result is Failure<E> {
  invariant(result.isFailure(), 'Expected a failure result');
}
