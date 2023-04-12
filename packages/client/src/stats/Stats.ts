import { LensConfig } from '../consts/config';
import { InferResultType } from '../consts/types';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import { GlobalProtocolStatsRequest } from '../graphql/types.generated';
import { getSdk, GlobalProtocolStatsQuery, Sdk } from './graphql/stats.generated';

export class Stats {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async fetch(
    request?: GlobalProtocolStatsRequest,
  ): Promise<InferResultType<GlobalProtocolStatsQuery>> {
    const result = await this.sdk.GlobalProtocolStats({ request });

    return result.data.result;
  }
}
