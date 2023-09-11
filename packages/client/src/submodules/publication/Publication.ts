import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import {
  CreateMomokaPublicationResultFragment,
  LensProfileManagerRelayErrorFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import { AnyPublicationFragment } from '../../graphql/types';
import type {
  HidePublicationRequest,
  LegacyCollectRequest,
  MomokaCommentRequest,
  MomokaMirrorRequest,
  MomokaPostRequest,
  MomokaQuoteRequest,
  OnchainCommentRequest,
  OnchainMirrorRequest,
  OnchainPostRequest,
  OnchainQuoteRequest,
  PublicationRequest,
  PublicationsRequest,
  PublicationsTagsRequest,
  ReportPublicationRequest,
  TypedDataOptions,
  ValidatePublicationMetadataRequest,
} from '../../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  CreateLegacyCollectBroadcastItemResultFragment,
  CreateMomokaCommentBroadcastItemResultFragment,
  CreateMomokaMirrorBroadcastItemResultFragment,
  CreateMomokaPostBroadcastItemResultFragment,
  CreateMomokaQuoteBroadcastItemResultFragment,
  CreateOnchainCommentBroadcastItemResultFragment,
  CreateOnchainMirrorBroadcastItemResultFragment,
  CreateOnchainPostBroadcastItemResultFragment,
  CreateOnchainQuoteBroadcastItemResultFragment,
  getSdk,
  PublicationStatsFragment,
  PublicationStatsQueryVariables,
  PublicationValidateMetadataResultFragment,
  Sdk,
  TagResultFragment,
} from './graphql/publication.generated';
import { isMirrorPublication } from './helpers';
import { Bookmarks, Reactions, NotInterested, Actions } from './submodules';

/**
 * @group LensClient Modules
 */
export class Publication {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(
    private readonly config: LensConfig,
    authentication?: Authentication,
  ) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  /**
   * The Bookmarks module
   */
  get bookmarks(): Bookmarks {
    return new Bookmarks(this.config, this.authentication);
  }

  /**
   * The Reactions module
   */
  get reactions(): Reactions {
    return new Reactions(this.config, this.authentication);
  }

  /**
   * The NotInterested module
   */
  get notInterested(): NotInterested {
    return new NotInterested(this.config, this.authentication);
  }

  get actions(): Actions {
    return new Actions(this.config, this.authentication);
  }

  async fetch(request: PublicationRequest): Promise<AnyPublicationFragment | null> {
    const result = await this.sdk.Publication({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
    });

    return result.data.result;
  }

  async fetchAll(
    request: PublicationsRequest,
  ): Promise<PaginatedResult<AnyPublicationFragment | null>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Publications({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
  }

  async stats(vars: PublicationStatsQueryVariables): Promise<PublicationStatsFragment | undefined> {
    const result = await this.sdk.PublicationStats(vars);
    const data = result.data.result;

    if (data === null || isMirrorPublication(data)) {
      return undefined;
    }
    return data.stats;
  }

  async tags(request: PublicationsTagsRequest): Promise<PaginatedResult<TagResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.PublicationsTags({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  async validateMetadata(
    request: ValidatePublicationMetadataRequest,
  ): Promise<PublicationValidateMetadataResultFragment> {
    const result = await this.sdk.ValidatePublicationMetadata({
      request,
    });

    return result.data.result;
  }

  async hide(
    request: HidePublicationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.HidePublication({ request }, headers);
    });
  }

  async report(
    request: ReportPublicationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.ReportPublication({ request }, headers);
    });
  }

  async postOnchain(
    request: OnchainPostRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PostOnchain({ request }, headers);
      return result.data.result;
    });
  }

  async commentOnchain(
    request: OnchainCommentRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CommentOnchain({ request }, headers);
      return result.data.result;
    });
  }

  async mirrorOnchain(
    request: OnchainMirrorRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.MirrorOnchain({ request }, headers);
      return result.data.result;
    });
  }

  async quoteOnchain(
    request: OnchainQuoteRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.QuoteOnchain({ request }, headers);
      return result.data.result;
    });
  }

  async postOnMomoka(
    request: MomokaPostRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PostOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  async commentOnMomoka(
    request: MomokaCommentRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CommentOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  async mirrorOnMomoka(
    request: MomokaMirrorRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.MirrorOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  async quoteOnMomoka(
    request: MomokaQuoteRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | LensProfileManagerRelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.QuoteOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  async createOnchainPostTypedData(
    request: OnchainPostRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnchainPostBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnchainPostTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createOnchainCommentTypedData(
    request: OnchainCommentRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnchainCommentBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnchainCommentTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createOnchainMirrorTypedData(
    request: OnchainMirrorRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnchainMirrorBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnchainMirrorTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createOnchainQuoteTypedData(
    request: OnchainQuoteRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnchainQuoteBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnchainQuoteTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createMomokaPostTypedData(
    request: MomokaPostRequest,
  ): PromiseResult<
    CreateMomokaPostBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMomokaPostTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createMomokaCommentTypedData(
    request: MomokaCommentRequest,
  ): PromiseResult<
    CreateMomokaCommentBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMomokaCommentTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createMomokaMirrorTypedData(
    request: MomokaMirrorRequest,
  ): PromiseResult<
    CreateMomokaMirrorBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMomokaMirrorTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createMomokaQuoteTypedData(
    request: MomokaQuoteRequest,
  ): PromiseResult<
    CreateMomokaQuoteBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMomokaQuoteTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async legacyCollect(
    request: LegacyCollectRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.LegacyCollectPublication({ request }, headers);
      return result.data.result;
    });
  }

  async createLegacyCollectTypedData(
    request: LegacyCollectRequest,
  ): PromiseResult<
    CreateLegacyCollectBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateLegacyCollectTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }
}
