import { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import { Authentication } from '../authentication';
import { LensConfig } from '../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { InferResultType } from '../consts/types';
import { Erc20Fragment } from '../graphql/fragments.generated';
import {
  ApprovedModuleAllowanceAmountRequest,
  GenerateModuleCurrencyApprovalDataRequest,
} from '../graphql/types.generated';
import { execute } from '../helpers/execute';
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
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  async fetchEnabledCurrencies(): PromiseResult<
    Erc20Fragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.EnabledModuleCurrencies({}, headers);

      return result.data.result;
    });
  }

  async fetchEnabled(): PromiseResult<
    EnabledModulesFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return execute(this.authentication, async (headers) => {
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
    return execute(this.authentication, async (headers) => {
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
    return execute(this.authentication, async (headers) => {
      const result = await this.sdk.GenerateModuleCurrencyApprovalData({ request }, headers);

      return result.data.result;
    });
  }
}
