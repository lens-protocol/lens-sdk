import { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { Erc20Fragment } from '../../graphql/fragments.generated';
import {
  ApprovedModuleAllowanceAmountRequest,
  GenerateModuleCurrencyApprovalDataRequest,
  PaginatedOffsetRequest,
  SupportedModulesRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildPaginatedQueryResult,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  ApprovedAllowanceAmountResultFragment,
  GenerateModuleCurrencyApprovalResultFragment,
  KnownSupportedModuleFragment,
  Sdk,
  UnknownSupportedModuleFragment,
  getSdk,
} from './graphql/modules.generated';

/**
 * @group LensClient Modules
 */
export class Modules {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
    this.authentication = authentication;
  }

  async fetchCurrencies(
    request: PaginatedOffsetRequest,
  ): PromiseResult<
    PaginatedResult<Erc20Fragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Currencies({ request: currRequest }, headers);

        return result.data.result;
      }, request);
    });
  }

  async approvedAllowanceAmount(
    request: ApprovedModuleAllowanceAmountRequest,
  ): PromiseResult<
    ApprovedAllowanceAmountResultFragment[],
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
    GenerateModuleCurrencyApprovalResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.GenerateModuleCurrencyApprovalData({ request }, headers);

      return result.data.result;
    });
  }

  async supportedFollowModules(
    request: SupportedModulesRequest,
  ): PromiseResult<
    PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.SupportedFollowModules({ request: currRequest }, headers);

        return result.data.result;
      }, request);
    });
  }

  async supportedReferenceModules(
    request: SupportedModulesRequest,
  ): PromiseResult<
    PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.SupportedReferenceModules({ request: currRequest }, headers);

        return result.data.result;
      }, request);
    });
  }

  async supportedOpenActionModules(
    request: SupportedModulesRequest,
  ): PromiseResult<
    PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.SupportedOpenActionModules({ request: currRequest }, headers);

        return result.data.result;
      }, request);
    });
  }

  async supportedOpenActionCollectModules(
    request: SupportedModulesRequest,
  ): PromiseResult<
    PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.SupportedOpenActionCollectModules(
          { request: currRequest },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }
}
