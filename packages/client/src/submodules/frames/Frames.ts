import { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../../authentication';
import { LensContext } from '../../context';
import { CredentialsExpiredError, NotAuthenticatedError } from '../../errors';
import { FetchGraphQLClient } from '../../graphql/FetchGraphQLClient';
import {
  FrameEip712Request,
  FrameLensManagerEip712Request,
  FrameVerifySignature,
  FrameVerifySignatureResult,
} from '../../graphql/types.generated';
import { requireAuthHeaders, sdkAuthHeaderWrapper } from '../../helpers';
import {
  CreateFrameEip712TypedDataFragment,
  FrameLensManagerSignatureResultFragment,
  Sdk,
  getSdk,
} from './graphql/frames.generated';

/**
 * Lens Frames
 *
 * @group LensClient Modules
 */
export class Frames {
  private readonly sdk: Sdk;

  /**
   * @internal
   */
  constructor(
    context: LensContext,
    private readonly authentication: Authentication,
  ) {
    const client = new FetchGraphQLClient(context);

    this.sdk = getSdk(client, sdkAuthHeaderWrapper(authentication));
  }

  /**
   * Create Frame action typed data to be signed by user wallet
   *
   * @param request - The request object
   * @returns Typed data for Frame request
   * @experimental This function might change in the future release
   *
   * @example
   * ```ts
   * const result = await client.frames.createFrameTypedData({
   *   actionResponse: '0x0000000000000000000000000000000000000000',
   *   buttonIndex: 2,
   *   deadline: 1711038973,
   *   inputText: 'Hello, World!',
   *   profileId: '0x01',
   *   pubId: '0x01-0x01',
   *   specVersion: '1.0.0',
   *   state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
   *   url: 'https://mylensframe.xyz',
   * });
   * ```
   */
  async createFrameTypedData(
    request: FrameEip712Request,
  ): Promise<CreateFrameEip712TypedDataFragment> {
    const response = await this.sdk.CreateFrameTypedData({ request });
    return response.data.result;
  }

  /**
   * Sign Frame action with Lens Manager if enabled
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - The request object
   * @returns Signature result
   * @experimental This function might change in the future release
   *
   * @example
   * ```ts
   * const result = await client.frames.signFrameAction({
   *   actionResponse: '0x0000000000000000000000000000000000000000',
   *   buttonIndex: 2,
   *   inputText: 'Hello, World!',
   *   profileId: '0x01',
   *   pubId: '0x01-0x01',
   *   specVersion: '1.0.0',
   *   state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
   *   url: 'https://mylensframe.xyz',
   * });
   * ```
   */
  async signFrameAction(
    request: FrameLensManagerEip712Request,
  ): PromiseResult<
    FrameLensManagerSignatureResultFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.SignFrameAction(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Verify Frame signature
   *
   * @param request - The request object
   * @returns Verification result
   * @experimental This function might change in the future release
   *
   * @example
   * ```ts
   * const result = await client.frames.verifyFrameSignature({
   *   identityToken: identityToken,
   *   signature: data.signature,
   *   signedTypedData: data.signedTypedData,
   * });
   * ```
   */
  async verifyFrameSignature(request: FrameVerifySignature): Promise<FrameVerifySignatureResult> {
    const response = await this.sdk.VerifyFrameSignature({ request });
    return response.data.result;
  }
}
