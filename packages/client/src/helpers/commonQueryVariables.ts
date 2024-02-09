import { LensContext } from '../context';
import { ImageTransform } from '../graphql';
import {
  ProfileStatsArg,
  ProfileStatsCountOpenActionArgs,
  PublicationOperationsActedArgs,
  PublicationStatsCountOpenActionArgs,
  PublicationStatsInput,
  RateRequest,
} from '../graphql/types.generated';
import { AppId } from '../queryParams';

type CommonQueryVariables = {
  publicationImageTransform?: ImageTransform;
  publicationOperationsActedArgs?: PublicationOperationsActedArgs;
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
  profileCoverTransform?: ImageTransform;
  profilePictureTransform?: ImageTransform;
  profileStatsArg?: ProfileStatsArg;
  profileStatsCountOpenActionArgs?: ProfileStatsCountOpenActionArgs;
  profileMetadataSource?: AppId;
  rateRequest?: RateRequest;
};

export function commonQueryVariables({ params }: LensContext): CommonQueryVariables {
  return {
    publicationImageTransform: params.image?.medium,
    publicationOperationsActedArgs: {},
    publicationStatsInput: { metadata: { publishedOn: params.statsFor } },
    publicationStatsCountOpenActionArgs: {},
    profileCoverTransform: params.profile?.cover,
    profilePictureTransform: params.profile?.thumbnail,
    profileStatsArg: { forApps: params.statsFor },
    profileStatsCountOpenActionArgs: {},
    profileMetadataSource: params.profile?.metadataSource,
    rateRequest: params.fxRateFor && {
      for: params.fxRateFor,
    },
  };
}
