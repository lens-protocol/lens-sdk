type PollArgs<T> = {
  fn: (...args: unknown[]) => Promise<T>;
  validate: (result: T) => boolean;
  onMaxAttempts: () => Error | void;
  interval?: number;
  maxAttempts?: number;
};

const POLL_INTERVAL = 1000;
const POLL_MAX_ATTEMPTS = 60; // try for 60 sec

export async function poll<T>({
  fn,
  validate,
  onMaxAttempts,
  interval = POLL_INTERVAL,
  maxAttempts = POLL_MAX_ATTEMPTS,
}: PollArgs<T>): Promise<T> {
  let attempts = 0;

  const executePoll = async (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => void,
  ) => {
    try {
      const result = await fn();
      attempts++;

      if (validate(result)) {
        return resolve(result);
      } else if (maxAttempts && attempts === maxAttempts) {
        return reject(onMaxAttempts());
      } else {
        setTimeout(executePoll, interval, resolve, reject);
      }
    } catch (e) {
      return reject(e);
    }
  };

  return new Promise(executePoll) as Promise<T>;
}
