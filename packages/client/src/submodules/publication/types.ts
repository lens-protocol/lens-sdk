import { PublicationStatsCountOpenActionArgs } from '../../graphql/types.generated';

export type FetchPublicationOptions = {
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
