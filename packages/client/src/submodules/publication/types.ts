import {
  PublicationStatsCountOpenActionArgs,
  PublicationStatsInput,
} from '../../graphql/types.generated';

export type FetchPublicationOptions = {
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
};
