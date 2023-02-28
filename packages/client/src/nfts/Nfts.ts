import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { InferResultType } from '../consts/types';
import {
  NftGalleriesRequest,
  NftGalleryCreateRequest,
  NftGalleryDeleteRequest,
  NftGalleryUpdateInfoRequest,
  NftGalleryUpdateItemOrderRequest,
  NftGalleryUpdateItemsRequest,
  NftOwnershipChallengeRequest,
  NfTsRequest,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { execute } from '../helpers/execute';
import {
  getSdk,
  NftFragment,
  NftGalleryFragment,
  NftOwnershipChallengeQuery,
  Sdk,
} from './graphql/nfts.generated';

export class Nfts {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(request: NfTsRequest): Promise<PaginatedResult<NftFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Nfts({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  async ownershipChallenge(
    request: NftOwnershipChallengeRequest,
  ): PromiseResult<
    InferResultType<NftOwnershipChallengeQuery>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.NftOwnershipChallenge({ request }, headers);

      return result.data.result;
    });
  }

  async fetchGalleries(request: NftGalleriesRequest): Promise<NftGalleryFragment[]> {
    const result = await this.sdk.ProfileGalleries({ request });

    return result.data.result;
  }

  async createGallery(
    request: NftGalleryCreateRequest,
  ): PromiseResult<string, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateNFTGallery({ request }, headers);

      return result.data.result;
    });
  }

  async updateGalleryInfo(
    request: NftGalleryUpdateInfoRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.UpdateNFTGalleryInfo({ request }, headers);
    });
  }

  async updateGalleryItems(
    request: NftGalleryUpdateItemsRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.UpdateNFTGalleryItems({ request }, headers);
    });
  }

  async updateGalleryOrder(
    request: NftGalleryUpdateItemOrderRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.UpdateNFTGalleryOrder({ request }, headers);
    });
  }

  async deleteGallery(
    request: NftGalleryDeleteRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.DeleteNFTGallery({ request }, headers);
    });
  }
}
