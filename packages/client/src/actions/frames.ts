import {
  CreateFrameTypedDataQuery,
  FrameVerifySignatureResult,
  SignFrameActionMutation,
  VerifyFrameSignatureQuery,
} from '@lens-protocol/graphql';
import type {
  CreateFrameEip712TypedDataFragment,
  CreateFrameTypedDataRequest,
  FrameLensManagerSignatureResultFragment,
  SignFrameActionRequest,
  VerifyFrameSignatureRequest,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Create Frame action typed data to be signed by user wallet
 *
 * @param request - The request object
 * @returns Typed data for Frame request
 * @experimental This function might change in the future release
 *
 * @example
 * ```ts
 * const result = await createFrameTypedData(anyClient, {
 *   transactionId: '0x0000000000000000000000000000000000000000',
 *   buttonIndex: 2,
 *   deadline: 1711038973,
 *   inputText: 'Hello, World!',
 *   account: '0x0000000000000000000000000000000000000000',
 *   post: '0x01-0x01',
 *   app: '0x0000000000000000000000000000000000000000,
 *   specVersion: '1.1.0',
 *   state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
 *   url: 'https://mylensframe.xyz',
 * });
 * ```
 */
export function createFrameTypedData(
  client: AnyClient,
  request: CreateFrameTypedDataRequest,
): ResultAsync<CreateFrameEip712TypedDataFragment, UnexpectedError> {
  return client.query(CreateFrameTypedDataQuery, { request });
}

/**
 * Sign Frame action with Lens Manager if enabled
 *
 * ⚠️ Requires authenticated SessionClient.
 *
 * @param request - The request object
 * @returns Signature result
 * @experimental This function might change in the future release
 *
 * @example
 * ```ts
 * const result = await signFrameAction(sessionClient, {
 *   transactionId: '0x0000000000000000000000000000000000000000',
 *   buttonIndex: 2,
 *   inputText: 'Hello, World!',
 *   account: '0x0000000000000000000000000000000000000000',
 *   post: '0x01-0x01',
 *   app: '0x0000000000000000000000000000000000000000,
 *   specVersion: '1.1.0',
 *   state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
 *   url: 'https://mylensframe.xyz',
 * });
 * ```
 */
export function signFrameAction(
  client: SessionClient,
  request: SignFrameActionRequest,
): ResultAsync<FrameLensManagerSignatureResultFragment, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SignFrameActionMutation, { request });
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
 * const result = await verifyFrameSignature(anyClient, {
 *   identityToken: identityToken,
 *   signature: data.signature,
 *   signedTypedData: data.signedTypedData,
 * });
 * ```
 */
export function verifyFrameSignature(
  client: AnyClient,
  request: VerifyFrameSignatureRequest,
): ResultAsync<FrameVerifySignatureResult, UnexpectedError> {
  return client
    .query(VerifyFrameSignatureQuery, { request });
}
