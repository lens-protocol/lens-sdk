import type { RelayerResultFragment, RelayErrorFragment } from '../../graphql/fragments.generated';
import type {
  TransactionErrorFragment,
  TransactionIndexedResultFragment,
} from '../graphql/transaction.generated';

/**
 * Check if the result is a {@link RelayerResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelayerResultFragment}
 */
export function isRelayerResult(
  result: RelayerResultFragment | RelayErrorFragment,
): result is RelayerResultFragment {
  return result.__typename === 'RelayerResult';
}

/**
 * Check if the result is a {@link RelayErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelayErrorFragment}
 */
export function isRelayerError(
  result: RelayerResultFragment | RelayErrorFragment,
): result is RelayErrorFragment {
  return result.__typename === 'RelayError';
}

/**
 * Check if the result is a {@link TransactionIndexedResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link TransactionIndexedResultFragment}
 */
export function isTransactionIndexedResult(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): result is TransactionIndexedResultFragment {
  return result.__typename === 'TransactionIndexedResult';
}

/**
 * Check if the result is a {@link TransactionErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link TransactionErrorFragment}
 */
export function isTransactionError(
  result: TransactionIndexedResultFragment | TransactionErrorFragment,
): result is TransactionErrorFragment {
  return result.__typename === 'TransactionError';
}
