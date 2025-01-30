import type {
  TransferPrimitiveOwnershipRequest,
  TransferPrimitiveOwnershipResult,
} from '@lens-protocol/graphql';
import { TransferPrimitiveOwnershipMutation } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

/**
 * Transfer primitive ownership.
 *
 * ```ts
 * const result = await transferPrimitiveOwnership(sessionClient, {
 *   newOwner: evmAddress('0x1234…'),
 *   address: evmAddress('0x5678…'),
 * });
 * ```
 *
 * @param client - Session client.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function transferPrimitiveOwnership(
  client: SessionClient,
  request: TransferPrimitiveOwnershipRequest,
): ResultAsync<TransferPrimitiveOwnershipResult, UnauthenticatedError | UnexpectedError> {
  return client.mutation(TransferPrimitiveOwnershipMutation, { request });
}
