import type { App } from '@lens-protocol/graphql';
import { AppQuery } from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AppRequest } from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnexpectedError } from '../errors';

/**
 * Fetch an App.
 *
 * Using a {@link SessionClient} will yield {@link App#operations}
 *
 * ```ts
 * const result = await fetchApp(anyClient, {
 *   address?: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The App query request.
 * @returns The App or `null` if it does not exist.
 */
export function fetchApp(
  client: AnyClient,
  request: AppRequest,
): ResultAsync<App | null, UnexpectedError> {
  return client.query(AppQuery, { request });
}
