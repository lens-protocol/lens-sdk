import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { InferResultType } from '../consts/types';
import { NotificationRequest } from '../graphql/types.generated';
import { buildPaginatedQueryResult } from '../helpers/buildPaginatedQueryResult';
import { execute } from '../helpers/execute';
import { getSdk, NotificationsQuery, Sdk } from './graphql/notifications.generated';

export class Notifications {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetch(
    request: NotificationRequest,
    observerId?: string,
  ): PromiseResult<
    InferResultType<NotificationsQuery>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Notifications(
          {
            request: currRequest,
            observerId,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
