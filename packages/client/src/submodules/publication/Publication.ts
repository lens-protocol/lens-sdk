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
  PublicationValidateMetadataResultFragment,
  Sdk,
  TagResultFragment,
} from './graphql/publication.generated';
import { isMirrorPublication } from './helpers';
import { Bookmarks, Reactions, NotInterested, Actions } from './submodules';
import { PublicationStatsVariables } from './types';

/**
 * Publications are the posts, comments, mirrors and quotes that a profile creates.
 *
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

  /**
   * The Actions module
   */
  get actions(): Actions {
    return new Actions(this.config, this.authentication);
  }

  /**
   * Fetch a publication
   *
   * @param request - Request object for the query
   * @returns {@link AnyPublicationFragment} or null if not found
   *
   * @example
   * ```ts
   * const result = await client.publication.fetch({
   *   for: '0x123-0x456',
   * });
   * ```
   */
  async fetch(request: PublicationRequest): Promise<AnyPublicationFragment | null> {
    const result = await this.sdk.Publication({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
    });

    return result.data.result;
  }

  /**
   * Fetch all publications by requested criteria
   *
   * @param request - Request object for the query
   * @returns {@link AnyPublicationFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.publication.fetchAll({
   *   where: {
   *     from: ['0x123'],
   *   },
   * });
   * ```
   */
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

  /**
   * Fetch a publication's stats
   *
   * @param vars - Object defining all variables for the query
   * @returns {@link PublicationStatsFragment} or undefined if not found or publication is a mirror
   *
   * @example
   * ```ts
   * const result = await client.publication.stats({
   *   request: {
   *     for: "0x123",
   *   },
   * });
   * ```
   */
  async stats(vars: PublicationStatsVariables): Promise<PublicationStatsFragment | undefined> {
    const { request, statsRequest = {}, reactionsRequest = {}, openActionsRequest = {} } = vars;
    const result = await this.sdk.PublicationStats({
      request,
      statsRequest,
      reactionsRequest,
      openActionsRequest,
    });
    const data = result.data.result;

    if (data === null || isMirrorPublication(data)) {
      return undefined;
    }
    return data.stats;
  }

  /**
   * TODO
   */
  async tags(request: PublicationsTagsRequest): Promise<PaginatedResult<TagResultFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.PublicationsTags({
        request: currRequest,
      });

      return result.data.result;
    }, request);
  }

  /**
   * Validate a publication's metadata before creating it
   *
   * @param request - Request object for the query
   * @returns Validation result
   *
   * @example
   * ```ts
   * const result = await client.publication.validateMetadata(metadata);
   *
   * if (!result.valid) {
   *   throw new Error(`Metadata is not valid because of ${result.reason}`);
   * }
   * ```
   */
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
