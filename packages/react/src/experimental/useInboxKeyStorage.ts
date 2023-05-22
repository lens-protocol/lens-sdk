import { IStorage } from '@lens-protocol/storage';

import { useSharedDependencies } from '../shared';

/**
 * Returns the internal inbox storage.
 *
 * @internal
 */
export function useInboxKeyStorage(): IStorage<string> {
  const { inboxKeyStorage } = useSharedDependencies();

  return inboxKeyStorage;
}
