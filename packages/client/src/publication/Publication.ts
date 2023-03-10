import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { InferResultType } from '../consts/types';
import {
  CommentFragment,
  PostFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  WalletFragment,
} from '../graphql/fragments.generated';
import { PublicationFragment } from '../graphql/types';
import {
  CreateCollectRequest,
  CreateMirrorRequest,
  CreatePublicCommentRequest,
  CreatePublicPostRequest,
  GetPublicationMetadataStatusRequest,
  HidePublicationRequest,
  ProfilePublicationsForSaleRequest,
  PublicationMetadataStatus,
  PublicationMetadataV2Input,
  PublicationQueryRequest,
  PublicationsQueryRequest,
  PublicationValidateMetadataResult,
  PublicMediaRequest,
  ReportPublicationRequest,
  TypedDataOptions,
  WhoCollectedPublicationRequest,
} from '../graphql/types.generated';
import { buildPaginatedQueryResult, PaginatedResult } from '../helpers/buildPaginatedQueryResult';
import { execute } from '../helpers/execute';
import {
  CreateAttachMediaDataMutation,
  CreateCollectTypedDataMutation,
  CreateCommentTypedDataMutation,
  CreateMirrorTypedDataMutation,
  CreatePostTypedDataMutation,
  getSdk,
  PublicationStatsFragment,
  Sdk,
} from './graphql/publication.generated';

export class Publication {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(
    request: PublicationQueryRequest,
    observerId?: string,
  ): Promise<PublicationFragment | null> {
    const result = await this.sdk.Publication({ request, observerId });

    return result.data.result;
  }

  async stats(
    request: PublicationQueryRequest,
    sources: string[],
  ): Promise<PublicationStatsFragment | undefined> {
    const result = await this.sdk.PublicationStats({
      request,
      sources,
    });

    return result.data.result?.stats;
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
      const result = await this.sdk.Publications({
        request: currRequest,
        observerId,
      });

      return result.data.result;
    }, request);
  }

  async allWalletsWhoCollected(
    request: WhoCollectedPublicationRequest,
    observerId?: string,
  ): Promise<PaginatedResult<WalletFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.WhoCollectedPublication({
        request: currRequest,
        observerId,
      });

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

  async createPostTypedData(
    request: CreatePublicPostRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreatePostTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreatePostTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createPostViaDispatcher(
    request: CreatePublicPostRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreatePostViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  async createCommentTypedData(
    request: CreatePublicCommentRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateCommentTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateCommentTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createCommentViaDispatcher(
    request: CreatePublicCommentRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateCommentViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  async createMirrorTypedData(
    request: CreateMirrorRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateMirrorTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMirrorTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createMirrorViaDispatcher(
    request: CreateMirrorRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMirrorViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  async createCollectTypedData(
    request: CreateCollectRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    InferResultType<CreateCollectTypedDataMutation>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.CreateCollectTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createAttachMediaData(
    request: PublicMediaRequest,
  ): Promise<InferResultType<CreateAttachMediaDataMutation>> {
    const result = await this.sdk.CreateAttachMediaData({ request });

    return result.data.result;
  }

  async hide(
    request: HidePublicationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.HidePublication({ request }, headers);
    });
  }

  async report(
    request: ReportPublicationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return execute(this.authentication, async (headers) => {
      await this.sdk.ReportPublication({ request }, headers);
    });
  }
}
