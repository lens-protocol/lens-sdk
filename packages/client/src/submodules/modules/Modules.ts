import { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensConfig } from '../../consts/config';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../consts/errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { Erc20Fragment } from '../../graphql/fragments.generated';
import {
  ApprovedModuleAllowanceAmountRequest,
  GenerateModuleCurrencyApprovalDataRequest,
} from '../../graphql/types.generated';
import { requireAuthHeaders } from '../../helpers';
import {
  ApprovedAllowanceAmountResultFragment,
  GenerateModuleCurrencyApprovalResultFragment,
  Sdk,
  SupportedModulesFragment,
  getSdk,
} from './graphql/modules.generated';

/**
 * Modules allow to include unique, custom functionality on follow, collect and reference.
 *
 * @group LensClient Modules
 */
export class Modules {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch  currencies.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with array of {@link Erc20Fragment}
   *
   * @example
   * ```ts
   * const result = await client.modules.fetchCurrencies();
   * ```
   */
  async fetchCurrencies(): PromiseResult<
    Erc20Fragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Currencies({}, headers);

      return result.data.result;
    });
  }

  /**
   * Fetch supported modules.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with {@link EnabledModulesFragment}
   *
   * @example
   * ```ts
   * const result = await client.modules.supportedModules();
   * ```
   */
  async supportedModules(): PromiseResult<
    SupportedModulesFragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SupportedModules({}, headers);

      return result.data.result;
    });
  }

  /**
   * Fetch the approved amount of requested currencies that each requested module can move
   * on behalf of the authenticated user.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns {@link PromiseResult} with array of {@link ApprovedAllowanceAmountResultFragment}
   *
   * @example
   * ```ts
   * import { CollectModules, FollowModules, ReferenceModules } from '@lens-protocol/client';
   *
   * const result = await client.modules.approvedAllowanceAmount({
   *   currencies: ['0x3C68CE8504087f89c640D02d133646d98e64ddd9'],
   *   collectModules: [CollectModules.LimitedFeeCollectModule],
   *   followModules: [FollowModules.FeeFollowModule],
   *   referenceModules: [ReferenceModules.FollowerOnlyReferenceModule],
   * });
   * ```
   */
  async approvedAllowanceAmount(
    request: ApprovedModuleAllowanceAmountRequest,
  ): PromiseResult<
    ApprovedAllowanceAmountResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ApprovedModuleAllowanceAmount({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Generate the data required to approve the amount of a currency to be moved by the module.
   *
   * This method encodes the allowance ERC-20 data for the module. It returns the partial transaction that still needs to be submitted.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @returns {@link PromiseResult} with {@link GenerateModuleCurrencyApprovalResultFragment}
   *
   * @example
   * ```ts
   * import { CollectModules } from '@lens-protocol/client';
   *
   * const result = await client.modules.generateCurrencyApprovalData({
   *  currency: '0xD40282e050723Ae26Aeb0F77022dB14470f4e011',
   *  value: '10',
   *  collectModule: CollectModules.LimitedFeeCollectModule,
   * });
   * ```
   */
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
}
