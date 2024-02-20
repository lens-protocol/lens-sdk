import { AppId } from '@lens-protocol/domain/entities';

import { ImageTransform } from './ImageTransform';
import { SupportedFiatType } from './graphql/generated';

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
export type PublicationFragmentVariables = ProfileFragmentVariables & {
  fxRateFor: SupportedFiatType;
  imageMediumSize: ImageTransform;
  imageSmallSize: ImageTransform;
  statsFor: AppId[];
};
