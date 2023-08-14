import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import {
  CreateMomokaPublicationResultFragment,
  RelayErrorFragment,
} from '../graphql/fragments.generated';
import {
  BroadcastRequest,
  MomokaTransactionRequest,
  MomokaTransactionsRequest,
} from '../graphql/types.generated';
import {
  PaginatedResult,
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
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
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async broadcast(
    request: BroadcastRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.BroadcastOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  async submitters(): Promise<PaginatedResult<MomokaSubmitterResultFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.MomokaSubmitters(currRequest, headers);

        return result.data.result;
      }, {});
    });
  }

  async summary(): Promise<{ totalTransactions: number }> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.MomokaSummary(undefined, headers);
      return result.data.result;
    });
  }

  async transaction(request: MomokaTransactionRequest): Promise<MomokaTransaction | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.MomokaTransaction({ request }, headers);
      return result.data.result;
    });
  }

  async transactions(
    request: MomokaTransactionsRequest,
  ): Promise<PaginatedResult<MomokaTransaction>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.momokaTransactions(
          {
            request: currRequest,
            ...buildImageTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );
        return result.data.result;
      }, request);
    });
  }
}
