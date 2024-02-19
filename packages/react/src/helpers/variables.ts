import { OperationVariables } from '@apollo/client';
import { ImageTransform, SupportedFiatType, defaultQueryParams } from '@lens-protocol/api-bindings';
import { AppId } from '@lens-protocol/domain/entities';
import { never } from '@lens-protocol/shared-kernel';

type ProfileVariables = {
  profileCoverSize: ImageTransform;
  profilePictureSize: ImageTransform;
  statsFor: AppId[];
  fxRateFor: SupportedFiatType;
  profileMetadataSource: AppId | null;
};

/**
 * @internal
 */
export function useProfileVariables<TVariables extends OperationVariables>(
  variables: TVariables,
): ProfileVariables & TVariables {
  return {
    ...variables,
    profileCoverSize: defaultQueryParams.profile?.cover ?? never(),
    profilePictureSize: defaultQueryParams.profile?.thumbnail ?? never(),
    statsFor: [],
    fxRateFor: SupportedFiatType.Eur,
    profileMetadataSource: null,
  };
}
