import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import {
  CommentFragment,
  LensProfileManagerRelayErrorFragment,
  MirrorFragment,
  PostFragment,
  QuoteFragment,
  RelaySuccessFragment,
} from '../../graphql/fragments.generated';
import type {
  CreateOnChainCommentRequest,
  CreateOnChainMirrorRequest,
  CreateOnChainPostRequest,
  CreateOnChainQuoteRequest,
  HidePublicationRequest,
  PublicationRequest,
  PublicationsRequest,
  PublicationsTagsRequest,
  ReportPublicationRequest,
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
  getSdk,
  PublicationValidateMetadataResultFragment,
  Sdk,
  TagResultFragment,
} from './graphql/publication.generated';
import { Bookmarks, Reactions, NotInterested } from './submodules';

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
   * The Not Interested module
   */
  get notInterested(): NotInterested {
    return new NotInterested(this.config, this.authentication);
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
}
