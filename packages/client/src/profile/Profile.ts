import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { ProfileFragment } from '../graphql/fragments.generated';
import type { ProfileRequest, ProfilesRequest } from '../graphql/types.generated';
import {
  PaginatedResult,
  buildMediaTransformsFromConfig,
  buildPaginatedQueryResult,
  provideAuthHeaders,
} from '../helpers';
import { getSdk, Sdk } from './graphql/profile.generated';

/**
 * @group LensClient Modules
 */
export class Profile {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(private readonly config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(request: ProfileRequest): Promise<ProfileFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Profile(
        {
          request,
          ...buildMediaTransformsFromConfig(this.config.mediaTransforms),
        },
        headers,
      );

      return result.data.result;
    });
  }

  async fetchAll(request: ProfilesRequest): Promise<PaginatedResult<ProfileFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Profiles(
          {
            request: currRequest,

            ...buildMediaTransformsFromConfig(this.config.mediaTransforms),
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
