import { PromiseResult } from '@lens-protocol/shared-kernel';

import { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { Erc20Fragment } from '../../graphql/fragments.generated';
import {
  ApprovedModuleAllowanceAmountRequest,
  GenerateModuleCurrencyApprovalDataRequest,
  ModuleMetadataRequest,
  PaginatedOffsetRequest,
  SupportedModulesRequest,
} from '../../graphql/types.generated';
import {
  PaginatedResult,
  buildPaginatedQueryResult,
  commonQueryVariables,
  requireAuthHeaders,
  sdkAuthHeaderWrapper,
} from '../../helpers';
import {
  ApprovedAllowanceAmountResultFragment,
  GenerateModuleCurrencyApprovalResultFragment,
  KnownSupportedModuleFragment,
  ModuleMetadataResultFragment,
  Sdk,
  UnknownSupportedModuleFragment,
  getSdk,
} from './graphql/modules.generated';

/**
 * @group LensClient Modules
 */
export class Modules {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    private readonly context: LensContext,
    private readonly authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);
    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Retrieve a list of currencies supported by the protocol
   *
   * @param request - The request object
   * @returns Currencies wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.modules.fetchCurrencies();
   * ```
   */
  async fetchCurrencies(
    request: PaginatedOffsetRequest = {},
  ): Promise<PaginatedResult<Erc20Fragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.Currencies({ request: currRequest });

      return result.data.result;
    }, request);
  }

  /**
   * Fetch the approved amount of requested currencies that each requested module can move
   * on behalf of the authenticated user.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - The request object
   * @returns {@link PromiseResult} with array of approved amounts per module
   *
   * @example
   * ```ts
   * import { FollowModuleType } from '@lens-protocol/client';
   *
   * const result = await client.modules.approvedAllowanceAmount({
   *   currencies: ['0x3C68CE8504087f89c640D02d133646d98e64ddd9'],
   *   followModules: [FollowModuleType.FeeFollowModule],
   * });
   * ```
   */
  async approvedAllowanceAmount(
    request: ApprovedModuleAllowanceAmountRequest,
  ): PromiseResult<
    ApprovedAllowanceAmountResultFragment[],
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ApprovedModuleAllowanceAmount(
        { request, ...commonQueryVariables(this.context) },
        headers,
      );

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
   * @param request - The request object
   * @returns {@link PromiseResult} with requested data
   *
   * @example
   * ```ts
   * import { FollowModuleType } from '@lens-protocol/client';
   *
   * const result = await client.modules.generateCurrencyApprovalData({
   *   allowance: {
   *     value: '100',
   *     currency: ['0x3C68CE8504087f89c640D02d133646d98e64ddd9'],
   *   },
   *   module: {
   *     followModule: FollowModuleType.FeeFollowModule,
   *   },
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

  /**
   * Retrieve a list of modules supported by the protocol
   *
   * @param request - The request object
   * @returns Modules wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.modules.supportedFollowModules();
   * ```
   */
  async supportedFollowModules(
    request: SupportedModulesRequest = {},
  ): Promise<PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.SupportedFollowModules({ request: currRequest });

      return result.data.result;
    }, request);
  }

  /**
   * Retrieve a list of modules supported by the protocol
   *
   * @param request - The request object
   * @returns Modules wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.modules.supportedReferenceModules();
   * ```
   */
  async supportedReferenceModules(
    request: SupportedModulesRequest = {},
  ): Promise<PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.SupportedReferenceModules({ request: currRequest });

      return result.data.result;
    }, request);
  }

  /**
   * Retrieve a list of modules supported by the protocol
   *
   * @param request - The request object
   * @returns Modules wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.modules.supportedOpenActionModules();
   * ```
   */
  async supportedOpenActionModules(
    request: SupportedModulesRequest = {},
  ): Promise<PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.SupportedOpenActionModules({ request: currRequest });

      return result.data.result;
    }, request);
  }

  /**
   * Retrieve a list of modules supported by the protocol
   *
   * @param request - The request object
   * @returns Modules wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.modules.supportedOpenActionCollectModules();
   * ```
   */
  async supportedOpenActionCollectModules(
    request: SupportedModulesRequest = {},
  ): Promise<PaginatedResult<KnownSupportedModuleFragment | UnknownSupportedModuleFragment>> {
    return buildPaginatedQueryResult(async (currRequest) => {
      const result = await this.sdk.SupportedOpenActionCollectModules({ request: currRequest });

      return result.data.result;
    }, request);
  }

  /**
   * Retrieve the Module Metadata for a given module
   *
   * @param request - The request object
   * @returns Module Metadata and how this can be used (gasless, signless, etc.). Returns `null` if the module is not found.
   *
   * @example
   * ```ts
   * const result = await client.modules.fetchMetadata({
   *   implementation: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   */
  async fetchMetadata(
    request: ModuleMetadataRequest,
  ): Promise<ModuleMetadataResultFragment | null> {
    const result = await this.sdk.ModuleMetadata({ request });

    return result.data.result;
  }
}
