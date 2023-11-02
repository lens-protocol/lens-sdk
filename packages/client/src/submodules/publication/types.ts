import {
  PublicationStatsCountOpenActionArgs,
  PublicationStatsInput,
} from '../../graphql/types.generated';

export type FetchPublicationOptions = {
  publicationStatsInput?: PublicationStatsInput;
  publicationStatsCountOpenActionArgs?: PublicationStatsCountOpenActionArgs;
};

/**
 * @experimental This is experimental and might change or be removed in future versions.
 */
export type RequestOverwrites = {
  /**
   * @experimental
   */
  accessToken?: string;
};
