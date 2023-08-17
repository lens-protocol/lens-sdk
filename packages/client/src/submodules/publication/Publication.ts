import type { Authentication } from '../../authentication';
import type { LensConfig } from '../../consts/config';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  QuoteFragment,
} from '../../graphql/fragments.generated';
import type { PublicationRequest, PublicationsRequest } from '../../graphql/types.generated';
import {
  buildImageTransformsFromConfig,
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
} from '../../helpers';
import { getSdk, Sdk } from './graphql/publication.generated';
import { Bookmarks, Reactions } from './submodules';

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

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * The Bookmarks module
   */
  get Bookmarks(): Bookmarks {
    return new Bookmarks(this.config, this.authentication);
  }

  /**
   * The Reactions module
   */
  get reactions(): Reactions {
    return new Reactions(this.config, this.authentication);
  }

  async fetch(
    request: PublicationRequest,
  ): Promise<CommentFragment | MirrorFragment | PostFragment | QuoteFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Publication(
        {
          request,
          ...buildImageTransformsFromConfig(this.config.mediaTransforms),
        },
        headers,
      );

      return result.data.result;
    });
  }

  async fetchAll(
    request: PublicationsRequest,
  ): Promise<
    PaginatedResult<CommentFragment | MirrorFragment | PostFragment | QuoteFragment | null>
  > {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Publications(
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
