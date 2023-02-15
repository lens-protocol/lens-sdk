import { GraphQLClient } from 'graphql-request';

import { LensConfig } from '../consts/config';
import {
  CommentFragment,
  CommonPaginatedResultInfoFragment,
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

  async fetchAll(
    request: PublicationsQueryRequest,
    observerId?: string,
  ): Promise<{
    items: PublicationFragment[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.Publications({ request, observerId });

    return result.data.result;
  }

  async validateMetadata(
    metadata: PublicationMetadataV2Input,
  ): Promise<PublicationValidateMetadataResult> {
    const result = await this.sdk.ValidatePublicationMetadata({ metadata });

    return result.data.validatePublicationMetadata;
  }

  async allWhoCollected(request: WhoCollectedPublicationRequest): Promise<{
    items: WalletFragment[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.WhoCollectedPublication({ request });

    return result.data.result;
  }

  async allForSale(
    request: ProfilePublicationsForSaleRequest,
    observerId?: string,
  ): Promise<{
    items: (PostFragment | CommentFragment)[];
    pageInfo: CommonPaginatedResultInfoFragment;
  }> {
    const result = await this.sdk.ProfilePublicationsForSale({
      request,
      observerId,
    });

    return result.data.result;
  }

  async metadataStatus(
    request: GetPublicationMetadataStatusRequest,
  ): Promise<PublicationMetadataStatus | null> {
    const result = await this.sdk.PublicationMetadataStatus({ request });

    return result.data.result;
  }
}
