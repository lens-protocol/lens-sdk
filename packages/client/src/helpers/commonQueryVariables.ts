import { LensContext } from '../context';
import { ImageSizeTransform, ImageTransform } from '../graphql';
import {
  ProfileStatsArg,
  ProfileStatsCountOpenActionArgs,
  PublicationOperationsActedArgs,
  PublicationStatsCountOpenActionArgs,
  PublicationStatsInput,
  RateRequest,
  SupportedFiatType,
} from '../graphql/types.generated';
import { AppId } from '../queryParams';

type CommonQueryVariables = {
  publicationImageSmallTransform: ImageTransform;
  publicationImageMediumTransform: ImageTransform;
  publicationOperationsActedArgs: PublicationOperationsActedArgs;
  publicationStatsInput: PublicationStatsInput;
  publicationStatsCountOpenActionArgs: PublicationStatsCountOpenActionArgs;
  profileCoverTransform: ImageTransform;
  profilePictureTransform: ImageTransform;
  profileStatsArg: ProfileStatsArg;
  profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs;
  profileMetadataSource?: AppId;
  rateRequest: RateRequest;
};

export function commonQueryVariables({
  params,
  mediaTransforms,
}: LensContext): CommonQueryVariables {
  return {
    publicationImageSmallTransform: pickImageTransform(
      mediaTransforms.publication,
      params.image?.small,
      buildImageTransform('400px'),
    ),
    publicationImageMediumTransform: pickImageTransform(
      mediaTransforms.publication,
      params.image?.medium,
      buildImageTransform('700px'),
    ),
    publicationOperationsActedArgs: {},
    publicationStatsInput: { metadata: { publishedOn: params.statsFor } },
    publicationStatsCountOpenActionArgs: {},
    profileCoverTransform: pickImageTransform(
      mediaTransforms.profileCover,
      params.profile?.cover,
      buildImageTransform('1100px'),
    ),
    profilePictureTransform: pickImageTransform(
      mediaTransforms.profilePicture,
      params.profile?.thumbnail,
      buildImageTransform('256px'),
    ),
    profileStatsArg: { forApps: params.statsFor },
    profileStatsCountOpenActionArgs: {},
    profileMetadataSource: params.profile?.metadataSource,
    rateRequest: {
      for: params.fxRateFor || SupportedFiatType.Usd,
    },
  };
}

function pickImageTransform(
  option1: ImageTransform | undefined,
  option2: ImageTransform | undefined,
  defaultOption: ImageTransform,
): ImageTransform {
  return option1 ?? option2 ?? defaultOption;
}

function buildImageTransform(
  width: ImageSizeTransform,
  height: ImageSizeTransform = 'auto',
): ImageTransform {
  return {
    width,
    height,
    keepAspectRatio: true,
  };
}
