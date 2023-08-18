import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import {
  CommentFragment,
  CreateMomokaPublicationResultFragment,
  LensProfileManagerRelayErrorFragment,
  MirrorFragment,
  PostFragment,
  QuoteFragment,
  RelayErrorFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import type {
  CreateOnChainCommentRequest,
  CreateOnChainMirrorRequest,
  CreateOnChainPostRequest,
  CreateOnChainQuoteRequest,
  HidePublicationRequest,
  MomokaCommentRequest,
  MomokaMirrorRequest,
  MomokaPostRequest,
  MomokaQuoteRequest,
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
  CreateMomokaCommentBroadcastItemResultFragment,
  CreateMomokaMirrorBroadcastItemResultFragment,
  CreateMomokaPostBroadcastItemResultFragment,
  CreateMomokaQuoteBroadcastItemResultFragment,
  CreateOnChainCommentBroadcastItemResultFragment,
  CreateOnChainMirrorBroadcastItemResultFragment,
  CreateOnChainPostBroadcastItemResultFragment,
  CreateOnChainQuoteBroadcastItemResultFragment,
  getSdk,
  PublicationValidateMetadataResultFragment,
  Sdk,
  TagResultFragment,
} from './graphql/publication.generated';
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

  async fetch(
    request: PublicationRequest,
  ): Promise<CommentFragment | MirrorFragment | PostFragment | QuoteFragment | null> {
    const result = await this.sdk.Publication({
      request,
      ...buildImageTransformsFromConfig(this.config.mediaTransforms),
    });

    return result.data.result;
  }

  async fetchAll(
    request: PublicationsRequest,
  ): Promise<
    PaginatedResult<CommentFragment | MirrorFragment | PostFragment | QuoteFragment | null>
  > {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Publications({
        request: currRequest,
        ...buildImageTransformsFromConfig(this.config.mediaTransforms),
      });

      return result.data.result;
    }, request);
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

  async postOnChain(
    request: CreateOnChainPostRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PostOnChain({ request }, headers);
      return result.data.result;
    });
  }

  async commentOnChain(
    request: CreateOnChainCommentRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CommentOnChain({ request }, headers);
      return result.data.result;
    });
  }

  async mirrorOnChain(
    request: CreateOnChainMirrorRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.MirrorOnChain({ request }, headers);
      return result.data.result;
    });
  }

  async quoteOnChain(
    request: CreateOnChainQuoteRequest,
  ): PromiseResult<
    LensProfileManagerRelayErrorFragment | RelaySuccessFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.QuoteOnChain({ request }, headers);
      return result.data.result;
    });
  }

  async postOnMomoka(
    request: MomokaPostRequest,
  ): PromiseResult<
    CreateMomokaPublicationResultFragment | RelayErrorFragment,
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
    CreateMomokaPublicationResultFragment | RelayErrorFragment,
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
    CreateMomokaPublicationResultFragment | RelayErrorFragment,
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
    CreateMomokaPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.QuoteOnMomoka({ request }, headers);
      return result.data.result;
    });
  }

  async createOnChainPostTypedData(
    request: CreateOnChainPostRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnChainPostBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnChainPostTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createOnChainCommentTypedData(
    request: CreateOnChainCommentRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnChainCommentBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnChainCommentTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createOnChainMirrorTypedData(
    request: CreateOnChainMirrorRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnChainMirrorBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnChainMirrorTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  async createOnChainQuoteTypedData(
    request: CreateOnChainQuoteRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateOnChainQuoteBroadcastItemResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateOnChainQuoteTypedData(
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
}
