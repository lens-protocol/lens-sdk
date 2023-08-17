import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { MomokaTransactionRequest, MomokaTransactionsRequest } from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  MomokaCommentTransactionFragment,
  MomokaMirrorTransactionFragment,
  MomokaPostTransactionFragment,
  MomokaQuoteTransactionFragment,
  MomokaSubmitterResultFragment,
  Sdk,
  getSdk,
} from './graphql/momoka.generated';

export type MomokaTransaction =
  | MomokaCommentTransactionFragment
  | MomokaMirrorTransactionFragment
  | MomokaPostTransactionFragment
  | MomokaQuoteTransactionFragment;

/**
 * @group LensClient Modules
 */
export class Momoka {
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  async submitters(): Promise<PaginatedResult<MomokaSubmitterResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MomokaSubmitters(currRequest);

      return result.data.result;
    }, {});
  }

  async summary(): Promise<{ totalTransactions: number }> {
    const result = await this.sdk.MomokaSummary(undefined);
    return result.data.result;
  }

  async transaction(request: MomokaTransactionRequest): Promise<MomokaTransaction | null> {
    const result = await this.sdk.MomokaTransaction({ request });
    return result.data.result;
  }

  async transactions(
    request: MomokaTransactionsRequest,
  ): Promise<PaginatedResult<MomokaTransaction>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.momokaTransactions({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });
      return result.data.result;
    }, request);
  }
}
