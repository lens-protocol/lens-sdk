import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { MomokaTransactionRequest, MomokaTransactionsRequest } from '../../graphql/types.generated';
import { PaginatedResult, buildPaginatedQueryResult, sdkAuthHeaderWrapper } from '../../helpers';
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

  /**
   * @internal
   */
  constructor(context: LensContext, authentication: Authentication) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Fetch momoka submitters
   *
   * @returns Submitters wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.momoka.submitters();
   * ```
   */
  async submitters(): Promise<PaginatedResult<MomokaSubmitterResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.MomokaSubmitters(currRequest);

      return result.data.result;
    }, {});
  }

  /**
   * Fetch momoka summary
   *
   * @returns Summary of momoka transactions
   *
   * @example
   * ```ts
   * const result = await client.momoka.summary();
   * ```
   */
  async summary(): Promise<{ totalTransactions: number }> {
    const result = await this.sdk.MomokaSummary(undefined);
    return result.data.result;
  }

  /**
   * Fetch momoka transaction
   *
   * @param request - The request object
   * @returns Momoka transaction
   *
   * @example
   * ```ts
   * const result = await client.momoka.transaction({ for: 'Go2-u7-11rykJn9nS7nNlQW4Bl2w0c3EOnn1_99Zltk' });
   * ```
   */
  async transaction(request: MomokaTransactionRequest): Promise<MomokaTransaction | null> {
    const result = await this.sdk.MomokaTransaction({ request });
    return result.data.result;
  }

  /**
   * Fetch momoka transactions
   *
   * @param request - The request object
   * @returns Momoka transactions wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.momoka.transactions();
   * ```
   */
  async transactions(
    request: MomokaTransactionsRequest = {},
  ): Promise<PaginatedResult<MomokaTransaction>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.momokaTransactions({
        request: currRequest,
      });
      return result.data.result;
    }, request);
  }
}
