import type {
  CreateMomokaPublicationResultFragment,
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
 * Check if the result is a {@link CreateMomokaPublicationResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link CreateMomokaPublicationResultFragment}
 */
export function isCreateMomokaPublicationResult<T extends { reason: string }>(
  result: CreateMomokaPublicationResultFragment | T,
): result is CreateMomokaPublicationResultFragment {
  return '__typename' in result && result.__typename === 'CreateMomokaPublicationResult';
}
