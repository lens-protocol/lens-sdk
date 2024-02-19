import { OperationVariables } from '@apollo/client';
import { ImageTransform, SupportedFiatType } from '@lens-protocol/api-bindings';
import { AppId } from '@lens-protocol/domain/entities';

import { QueryParams, defaultQueryParams } from '../config';
import { useSharedDependencies } from '../shared';

/**
 * @internal
 */
export type ProfileFragmentVariables = {
  fxRateFor: SupportedFiatType;
  profileCoverSize: ImageTransform;
  profileMetadataSource: AppId | null;
  profilePictureSize: ImageTransform;
  statsFor: AppId[];
};

/**
 * @internal
 */
export type PublicationFragmentVariables = {
  fxRateFor: SupportedFiatType;
  imageMediumSize: ImageTransform;
  imageSmallSize: ImageTransform;
  statsFor: AppId[];
};

/**
 * @internal
 */
export function resolveProfileFragmentVariables(params: QueryParams): ProfileFragmentVariables {
  return {
    fxRateFor: params.fxRateFor ?? defaultQueryParams.fxRateFor,
    profileCoverSize: params.profile?.cover ?? defaultQueryParams.profile.cover,
    profileMetadataSource: params.profile?.metadataSource ?? null,
    profilePictureSize: params.profile?.thumbnail ?? defaultQueryParams.profile.thumbnail,
    statsFor: params.statsFor ?? defaultQueryParams.statsFor,
  };
}

/**
 * @internal
 */
export function resolvePublicationFragmentVariables(
  params: QueryParams,
): PublicationFragmentVariables {
  return {
    ...resolveProfileFragmentVariables(params),
    fxRateFor: params.fxRateFor ?? defaultQueryParams.fxRateFor,
    imageMediumSize: params.image?.medium ?? defaultQueryParams.image.medium,
    imageSmallSize: params.image?.small ?? defaultQueryParams.image.small,
    statsFor: params.statsFor ?? defaultQueryParams.statsFor,
  };
}

/**
 * @internal
 */
export function useProfileFragmentVariables<TVariables extends OperationVariables>(
  variables: TVariables,
): ProfileFragmentVariables & TVariables {
  const { config } = useSharedDependencies();

  return {
    // order matters here, as we want to be able to override the resolved values on a hook-by-hook basis
    ...resolveProfileFragmentVariables(config.params),
    ...variables,
  };
}

/**
 * @internal
 */
export function usePublicationFragmentVariables<TVariables extends OperationVariables>(
  variables: TVariables,
): PublicationFragmentVariables & TVariables {
  const { config } = useSharedDependencies();

  return {
    // order matters here, as we want to be able to override the resolved values on a hook-by-hook basis
    ...resolvePublicationFragmentVariables(config.params),
    ...variables,
  };
}
