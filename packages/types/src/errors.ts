import { err, errAsync, type Result, type ResultAsync } from 'neverthrow';

export class ResultAwareError extends Error {
  /**
   * @internal
   */
  asResultAsync(): ResultAsync<never, typeof this> {
    return errAsync(this);
  }

  /**
   * @internal
   */
  asResult(): Result<never, typeof this> {
    return err(this);
  }

  /**
   * @internal
   */
  static from<T extends typeof ResultAwareError>(
    this: T,
    message: string,
  ): InstanceType<T>;
  static from<T extends typeof ResultAwareError>(
    this: T,
    cause: unknown,
  ): InstanceType<T>;
  static from<T extends typeof ResultAwareError>(
    this: T,
    args: unknown,
  ): InstanceType<T> {
    if (args instanceof Error) {
      // biome-ignore lint/complexity/noThisInStatic: intentional
      const message = this.formatMessage(args);
      // biome-ignore lint/complexity/noThisInStatic: intentional
      return new this(message, { cause: args }) as InstanceType<T>;
    }
    // biome-ignore lint/complexity/noThisInStatic: intentional
    return new this(String(args)) as InstanceType<T>;
  }

  static is<T extends typeof ResultAwareError>(
    this: T,
    error: unknown,
  ): error is InstanceType<T> {
    // biome-ignore lint/complexity/noThisInStatic: intentional
    return error instanceof this;
  }

  private static formatMessage(cause: Error): string {
    const messages: string[] = [];
    let currentError: unknown = cause;

    while (currentError instanceof Error) {
      if ('errors' in currentError && Array.isArray(currentError.errors)) {
        // Handle AggregateError
        const inner = currentError.errors.map((e: unknown) =>
          e instanceof Error ? e.message : String(e),
        );
        messages.push(inner.join(', '));
      } else {
        messages.push(currentError.message);
      }
      currentError = currentError.cause;
    }

    return messages.join(' due to ');
  }
}
