import type { Account, AccountQueryVariables } from '@lens-social/graphql';
import { AccountQuery } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { AnyClient } from '../client';
import type { UnexpectedError } from '../errors';

/**
 * Fetch an Account.
 *
 * Using a {@link SessionClient} will yield {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await getPost(client, { request: { postId: postId('0x01') } });
 * ```
 *
 * @param client - Any Lens client.
 * @returns The Account or `null` if it does not exist.
 */
export function fetchAccount(
  client: AnyClient,
  { request }: AccountQueryVariables,
): ResultAsync<Account | null, UnexpectedError> {
  return client.query(AccountQuery, { request });
}
