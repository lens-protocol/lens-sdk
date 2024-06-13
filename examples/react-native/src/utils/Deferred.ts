/**
 * Unwraps the promise to allow resolving/rejecting outside the Promise constructor
 */
export class Deferred<T = void> {
  readonly promise: Promise<T>;
  resolve!: (value: T) => void;
  reject!: (reason?: unknown) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
