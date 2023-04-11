import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { InferResultType } from '../consts/types';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type { Erc20Fragment } from '../graphql/fragments.generated';
import type {
  ApprovedModuleAllowanceAmountRequest,
  GenerateModuleCurrencyApprovalDataRequest,
} from '../graphql/types.generated';
import { requireAuthHeaders } from '../helpers';
import {
  ApprovedModuleAllowanceAmountQuery,
  EnabledModulesFragment,
  GenerateModuleCurrencyApprovalDataQuery,
  getSdk,
  Sdk,
} from './graphql/modules.generated';

export class Modules {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetchEnabledCurrencies(): PromiseResult<
    Erc20Fragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.EnabledModuleCurrencies({}, headers);

      return result.data.result;
    });
  }

  async fetchEnabled(): PromiseResult<
    EnabledModulesFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.EnabledModules({}, headers);

      return result.data.result;
    });
  }

  async approvedAllowanceAmount(
    request: ApprovedModuleAllowanceAmountRequest,
  ): PromiseResult<
    InferResultType<ApprovedModuleAllowanceAmountQuery>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ApprovedModuleAllowanceAmount({ request }, headers);

      return result.data.result;
    });
  }

  async generateCurrencyApprovalData(
    request: GenerateModuleCurrencyApprovalDataRequest,
  ): PromiseResult<
    InferResultType<GenerateModuleCurrencyApprovalDataQuery>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.GenerateModuleCurrencyApprovalData({ request }, headers);

      return result.data.result;
    });
  }
}
