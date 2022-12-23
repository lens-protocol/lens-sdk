import {
  ProxyActionError,
  ProxyActionQueued,
  ProxyActionStatusResult,
  TransactionError,
  TransactionIndexedResult,
} from '../generated';
import { JustTypename, PickByTypename } from './types';

type TransactionResultTypename =
  | JustTypename<TransactionIndexedResult>
  | JustTypename<TransactionError>;

export const isTransactionError = <T extends TransactionResultTypename>(
  publication: T,
): publication is PickByTypename<T, 'TransactionError'> => {
  return publication.__typename === 'TransactionError';
};

type ProxyActionStatusResultTypename =
  | JustTypename<ProxyActionStatusResult>
  | JustTypename<ProxyActionError>
  | JustTypename<ProxyActionQueued>;

export function isProxyActionError<T extends ProxyActionStatusResultTypename>(
  proxyActionResult: T,
): proxyActionResult is PickByTypename<T, 'ProxyActionError'> {
  return proxyActionResult.__typename === 'ProxyActionError';
}
