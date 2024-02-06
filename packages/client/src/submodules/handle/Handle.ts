import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import { HandleToAddressRequest } from '../../graphql/types.generated';
import { sdkAuthHeaderWrapper } from '../../helpers';
import { Sdk, getSdk } from './graphql/handle.generated';

/**
 * Handle is one of the Lens primitives.
 *
 * Handle can be used to identify an Lens Profile or standalone.
 *
 * @group LensClient Modules
 */
export class Handle {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(context: LensContext, authentication: Authentication) {
    const client = new FetchGraphQLClient(context);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Resolve a Handle to the owner address.
   * @param request - The request object
   * @returns The address or null
   *
   * @example
   * ```ts
   * const address = await client.handle.resolveAddress({ handle: 'lens/wagmi' });
   * ```
   */
  async resolveAddress(request: HandleToAddressRequest): Promise<string | null> {
    const response = await this.sdk.HandleToAddress({ request });
    return response.data.result;
  }
}
