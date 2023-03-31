import type { PromiseResult } from '@lens-protocol/shared-kernel';
import { GraphQLClient } from 'graphql-request';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import type { Erc20Fragment } from '../graphql/fragments.generated';
import type {
  ApprovedModuleAllowanceAmountRequest,
  GenerateModuleCurrencyApprovalDataRequest,
} from '../graphql/types.generated';
import { requireAuthHeaders } from '../helpers';
import {
  ApprovedAllowanceAmountFragment,
  EnabledModulesFragment,
  GenerateModuleCurrencyApprovalFragment,
  getSdk,
  Sdk,
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
    const client = new GraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch enabled currencies.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with array of {@link Erc20Fragment}
   *
   * @example
   * ```ts
   * const result = await client.modules.fetchEnabledCurrencies();
   * ```
   */
  async fetchEnabledCurrencies(): PromiseResult<
    Erc20Fragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.EnabledModuleCurrencies({}, headers);

      return result.data.result;
    });
  }

  /**
   * Fetch enabled modules.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with {@link EnabledModulesFragment}
   *
   * @example
   * ```ts
   * const result = await client.modules.fetchEnabled();
   * ```
   */
  async fetchEnabled(): PromiseResult<
    EnabledModulesFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.EnabledModules({}, headers);

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
   * @returns {@link PromiseResult} with array of {@link ApprovedAllowanceAmountFragment}
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
    ApprovedAllowanceAmountFragment[],
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
   * @returns {@link PromiseResult} with {@link GenerateModuleCurrencyApprovalFragment}
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
    GenerateModuleCurrencyApprovalFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.GenerateModuleCurrencyApprovalData({ request }, headers);

      return result.data.result;
    });
  }
}
