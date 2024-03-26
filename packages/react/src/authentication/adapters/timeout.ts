import { Brand } from '@lens-protocol/shared-kernel';

const POLLING_TIME = 1000;

export type TimerId = Brand<number, 'TimerId'>;

export type SafeTimeoutOptions = { poolingTimeout: number };

let lastActiveTimerId = 0;
const activeTimers = new Set<TimerId>();

function safeSetTimeoutRec(
  fn: () => void,
  endTime: number,
  timerId: TimerId,
  options: SafeTimeoutOptions,
) {
  const msToEnd = endTime - Date.now();

  setTimeout(
    () => {
      if (!activeTimers.has(timerId)) {
        return;
      }

      const now = Date.now();

      if (now >= endTime) {
        activeTimers.delete(timerId);
        fn();
      } else {
        safeSetTimeoutRec(fn, endTime, timerId, options);
      }
    },
    msToEnd <= options.poolingTimeout ? msToEnd : options.poolingTimeout,
  );
}

/**
 * Safe version of `setTimeout` that should support
 * 1. Large milliseconds delays (larger than 2147483647)
 * 2. Hibernation/Sleep
 *
 * @param fn - callback to be invoked after
 * @param ms - milliseconds to wait
 * @param options - timer options
 *
 * Note: `safeSetTimeout` should be only used when really needed
 *        as processor overhead is bigger than with normal `setTimeout`
 * @returns timerId Use `clearSafeTimeout(timerId)` to cancel timeout
 */
export function setSafeTimeout(
  fn: () => void,
  ms: number,
  options: SafeTimeoutOptions = { poolingTimeout: POLLING_TIME },
): TimerId {
  const timerId = ++lastActiveTimerId as TimerId;

  activeTimers.add(timerId);

  safeSetTimeoutRec(fn, Date.now() + ms, timerId, options);

  return timerId;
}

/**
 * Cancel timeout created with `safeSetTimeout`.
 */
export function clearSafeTimeout(timerId: TimerId): void {
  activeTimers.delete(timerId);
}
