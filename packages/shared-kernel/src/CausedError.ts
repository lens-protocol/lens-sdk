import defaultTo from 'lodash/defaultTo.js';
import isObject from 'lodash/isObject.js';

/**
 * This subclass of Error supports chaining.
 * If available, it uses the built-in support for property `.cause`.
 * Otherwise, it sets it up itself.
 *
 * @see https://github.com/tc39/proposal-error-cause
 * @internal
 */
export class CausedError extends Error {
  readonly cause?: Error;

  constructor(message: string, options?: { cause?: Error }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Error not yet properly typed
    super(message, options);

    if (isObject(options) && options.cause && !('cause' in this)) {
      const cause = options.cause;

      this.cause = cause;

      if (typeof cause.stack === 'string') {
        this.stack = defaultTo(this.stack, '') + '\nCAUSE: ' + cause.stack;
      }
    }
  }
}
