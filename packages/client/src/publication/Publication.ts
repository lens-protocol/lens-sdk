import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  WalletFragment,
} from '../graphql/fragments.generated';
import {
  GetPublicationMetadataStatusRequest,
  ProfilePublicationsForSaleRequest,
  PublicationMetadataStatus,
  PublicationMetadataV2Input,
  PublicationQueryRequest,
  PublicationsQueryRequest,
  PublicationValidateMetadataResult,
  WhoCollectedPublicationRequest,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { getSdk, Sdk } from './graphql/publication.generated';

export type PublicationFragment = PostFragment | CommentFragment | MirrorFragment;

export class Publication {
  private readonly sdk: Sdk;

  constructor(config: LensConfig) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
  }

  async fetch(
    request: PublicationQueryRequest,
    observerId?: string,
  ): Promise<PublicationFragment | null> {
    const result = await this.sdk.Publication({ request, observerId });

    return result.data.result;
  }

  async validateMetadata(
    metadata: PublicationMetadataV2Input,
  ): Promise<PublicationValidateMetadataResult> {
    const result = await this.sdk.ValidatePublicationMetadata({ metadata });

    return result.data.validatePublicationMetadata;
  }

  async metadataStatus(
    request: GetPublicationMetadataStatusRequest,
  ): Promise<PublicationMetadataStatus | null> {
    const result = await this.sdk.PublicationMetadataStatus({ request });

    return result.data.result;
  }

  async fetchAll(
    request: PublicationsQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Publications({ request: currRequest, observerId });

      return result.data.result;
    }, request);
  }

  async allWalletsWhoCollected(
    request: WhoCollectedPublicationRequest,
    observerId?: string,
  ): Promise<PaginatedResult<WalletFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.WhoCollectedPublication({ request: currRequest, observerId });

      return result.data.result;
    }, request);
  }

  async allForSale(
    request: ProfilePublicationsForSaleRequest,
    observerId?: string,
  ): Promise<PaginatedResult<CommentFragment | PostFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.ProfilePublicationsForSale({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }
}
