import type { RelayErrorFragment, RelaySuccessFragment } from '../../graphql/fragments.generated';
import {
  LensMetadataTransactionFragment,
  LensTransactionFragment,
} from '../graphql/transaction.generated';

/**
 * Check if the result is a {@link RelaySuccessFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelaySuccessFragment}
 */
export function isRelayerResult(
  result: RelaySuccessFragment | RelayErrorFragment,
): result is RelaySuccessFragment {
  return result.__typename === 'RelaySuccess';
}

/**
 * Check if the result is a {@link RelayErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelayErrorFragment}
 */
export function isRelayerError(
  result: RelaySuccessFragment | RelayErrorFragment,
): result is RelayErrorFragment {
  return result.__typename === 'RelayError';
}

export function isLensMetadataTransaction(
  result: LensMetadataTransactionFragment | LensTransactionFragment,
): result is LensMetadataTransactionFragment {
  return result.__typename === 'LensMetadataTransaction';
}

export function isLensTransaction(
  result: LensMetadataTransactionFragment | LensTransactionFragment,
): result is LensTransactionFragment {
  return result.__typename === 'LensTransaction';
}
