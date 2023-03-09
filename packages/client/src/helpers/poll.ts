type PollArgs<T> = {
  fn: (...args: unknown[]) => Promise<T>;
  validate: (result: T) => boolean;
  interval?: number;
  maxAttempts?: number;
};

enum TransactionErrorReason {
  EXCEEDED_MAX_ATTEMPTS = 'EXCEEDED_MAX_ATTEMPTS',
  UNKNOWN = 'UNKNOWN',
}

export class TransactionError extends Error {
  name = 'TransactionError' as const;

  constructor(readonly reason: TransactionErrorReason) {
    super(`Transaction failed due to: ${reason}`);
  }
}

const POLL_INTERVAL = 1000;
const POLL_MAX_ATTEMPTS = 20; // try for 20 sec

export async function poll<T>({
  fn,
  validate,
  interval = POLL_INTERVAL,
  maxAttempts = POLL_MAX_ATTEMPTS,
}: PollArgs<T>) {
  let attempts = 0;

  const executePoll = async (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => void,
  ) => {
    const result = await fn();
    attempts++;

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new TransactionError(TransactionErrorReason.EXCEEDED_MAX_ATTEMPTS));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
}
