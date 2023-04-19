import type {
  ProxyActionErrorFragment,
  ProxyActionQueuedFragment,
  ProxyActionStatusResultFragment,
} from '../graphql/proxy-action.generated';

/**
 * Check if the result is a {@link ProxyActionErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link ProxyActionErrorFragment}
 */
export function isProxyActionError(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionErrorFragment {
  return result.__typename === 'ProxyActionError';
}

/**
 * Check if the result is a {@link ProxyActionQueuedFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link ProxyActionQueuedFragment}
 */
export function isProxyActionQueued(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionQueuedFragment {
  return result.__typename === 'ProxyActionQueued';
}

/**
 * Check if the result is a {@link ProxyActionStatusResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link ProxyActionStatusResultFragment}
 */
export function isProxyActionStatusResult(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionStatusResultFragment {
  return result.__typename === 'ProxyActionStatusResult';
}
