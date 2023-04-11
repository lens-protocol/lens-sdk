import { LensConfig } from '../consts/config';
import { GlobalProtocolStatsRequest } from '../graphql/types.generated';
import { FetchGraphQLClient } from '../helpers/FetchGraphQLClient';
import { getSdk, GlobalProtocolStatsFragment, Sdk } from './graphql/stats.generated';

/**
 * Protocol stats.
 *
 * @group LensClient Modules
 */
export class Stats {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  /**
   * Fetch protocol stats.
   *
   * @param request - Request object for the query
   * @returns Protocol stats
   *
   * @example
   * ```ts
   * const result = await client.stats.fetch();
   * ```
   */
  async fetch(request?: GlobalProtocolStatsRequest): Promise<GlobalProtocolStatsFragment> {
    const result = await this.sdk.GlobalProtocolStats({ request });

    return result.data.result;
  }
}
