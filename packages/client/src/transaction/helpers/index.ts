import { RelayerResultFragment, RelayErrorFragment } from '../../graphql/fragments.generated';
import {
  TransactionErrorFragment,
  TransactionIndexedResultFragment,
} from '../graphql/transaction.generated';

export function isRelayerResult(
  result: RelayerResultFragment | RelayErrorFragment,
): result is RelayerResultFragment {
  return result.__typename === 'RelayerResult';
}

export function isRelayerError(
  result: RelayerResultFragment | RelayErrorFragment,
): result is RelayErrorFragment {
  return result.__typename === 'RelayError';
}

export function isTransactionIndexedResult(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): result is TransactionIndexedResultFragment {
  return result.__typename === 'TransactionIndexedResult';
}

export function isTransactionError(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): result is TransactionErrorFragment {
  return result.__typename === 'TransactionError';
}
