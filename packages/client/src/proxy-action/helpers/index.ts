import {
  ProxyActionErrorFragment,
  ProxyActionQueuedFragment,
  ProxyActionStatusResultFragment,
} from '../graphql/proxy-action.generated';

export function isProxyActionError(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionErrorFragment {
  return 'reason' in result;
}

export function isProxyActionQueued(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionQueuedFragment {
  return 'queuedAt' in result;
}

export function isProxyActionStatusResult(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionStatusResultFragment {
  return 'status' in result;
}
