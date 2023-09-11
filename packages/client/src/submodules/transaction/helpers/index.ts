import type {
  CreateMomokaPublicationResultFragment,
  LensProfileManagerRelayErrorFragment,
  RelayErrorFragment,
  RelaySuccessFragment,
} from '../../../graphql/fragments.generated';

/**
 * Check if the result is a {@link RelaySuccessFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelaySuccessFragment}
 */
export function isRelaySuccess<T extends { reason: string }>(
  result: RelaySuccessFragment | T,
): result is RelaySuccessFragment {
  return '__typename' in result && result.__typename === 'RelaySuccess';
}

/**
 * Check if the result is a {@link RelayErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelayErrorFragment}
 */
export function isRelayError(
  result: RelaySuccessFragment | RelayErrorFragment,
): result is RelayErrorFragment {
  return result.__typename === 'RelayError';
}

export function isMomokaRelayResult(
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment,
): result is CreateMomokaPublicationResultFragment {
  return 'momokaId' in result;
}

export function isSuccessfulLensProfileManagerResponse(
  result: RelaySuccessFragment | LensProfileManagerRelayErrorFragment,
): result is RelaySuccessFragment {
  return '__typename' in result && result.__typename === 'RelaySuccess';
}
