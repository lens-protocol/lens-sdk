import {
  ProxyActionErrorFragment,
  ProxyActionQueuedFragment,
  ProxyActionStatusResultFragment,
} from '../graphql/proxy-action.generated';

export function isProxyActionError(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionErrorFragment {
  return result.__typename === 'ProxyActionError';
}

export function isProxyActionQueued(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionQueuedFragment {
  return result.__typename === 'ProxyActionQueued';
}

export function isProxyActionStatusResult(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): result is ProxyActionStatusResultFragment {
  return result.__typename === 'ProxyActionStatusResult';
}
