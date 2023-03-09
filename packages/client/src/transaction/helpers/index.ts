import { RelayerResultFragment, RelayErrorFragment } from '../../graphql/fragments.generated';
import {
  TransactionErrorFragment,
  TransactionIndexedResultFragment,
} from '../graphql/transaction.generated';

export function isRelayerResult(
  result: RelayerResultFragment | RelayErrorFragment,
): result is RelayerResultFragment {
  return 'txId' in result;
}

export function isRelayerError(
  result: RelayerResultFragment | RelayErrorFragment,
): result is RelayErrorFragment {
  return 'reason' in result;
}

export function isTransactionIndexedResult(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): result is TransactionIndexedResultFragment {
  return 'indexed' in result;
}

export function isTransactionError(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): result is TransactionErrorFragment {
  return 'reason' in result;
}

export function getTxIdFromRelayerResult(
  result: RelayerResultFragment | RelayErrorFragment,
): string {
  if (isRelayerResult(result)) {
    return result.txId;
  }
  throw new Error(result.reason);
}

export function getIsIndexedFromTransactionResult(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): boolean {
  if (isTransactionIndexedResult(result)) {
    return result.indexed;
  }
  throw new Error(result.reason);
}
