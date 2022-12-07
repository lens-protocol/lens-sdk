import { clearSafeTimeout, safeSetTimeout } from '../safeSetTimeout';

const now = Date.now();

describe('safeSetTimeout', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.setSystemTime(now);
  });

  it('should return exact timing', () => {
    const callbackSpy = jest.fn();

    safeSetTimeout(callbackSpy, 10000);

    jest.setSystemTime(now + 10000);
    jest.runOnlyPendingTimers();

    expect(callbackSpy).toHaveBeenCalled();
  });

  it('should correctly clear timeout', () => {
    const callbackSpy = jest.fn();

    const timer = safeSetTimeout(callbackSpy, 10000);

    clearSafeTimeout(timer);

    jest.setSystemTime(now + 10000);
    jest.runOnlyPendingTimers();

    expect(callbackSpy).not.toHaveBeenCalled();
  });
});
