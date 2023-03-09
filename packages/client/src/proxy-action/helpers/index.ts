import { ProxyActionStatusTypes } from '../../graphql/types.generated';
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

export function getIsStatusCompleteFromProxyActionStatus(
  result: ProxyActionStatusResultFragment | ProxyActionErrorFragment | ProxyActionQueuedFragment,
): boolean {
  if (isProxyActionStatusResult(result)) {
    return result.status === ProxyActionStatusTypes.Complete;
  }
  return false;
}
