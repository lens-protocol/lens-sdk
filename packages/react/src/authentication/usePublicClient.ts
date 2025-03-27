import type { PublicClient } from '@lens-protocol/client';

import { useLensContext } from '../context';

/**
 * Retrieve the injected {@link PublicClient} from the context.
 */
export function usePublicClient(): PublicClient {
  const { state } = useLensContext();

  return state.client.isSessionClient() ? state.client.parent : state.client;
}
