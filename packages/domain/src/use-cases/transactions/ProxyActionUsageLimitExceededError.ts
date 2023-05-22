/**
 * An error thrown when the proxy action usage limit is exceeded.
 */
export class ProxyActionUsageLimitExceededError extends Error {
  name = 'ProxyActionUsageLimitExceededError' as const;

  /**
   * @internal
   */
  constructor(reason: string) {
    super(`proxy action usage limited exceeded reason: ${reason}`);
  }
}
