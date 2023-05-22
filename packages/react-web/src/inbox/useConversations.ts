import {
  ProfileId,
  useConversations as useConversationsBase,
  useEnvironmentConfig,
  useInboxKeyStorage,
} from '@lens-protocol/react';
import { useMemo } from 'react';

import { WebConversationProvider } from './adapters/WebConversationProvider';

export type UseConversationsArgs = {
  profileId?: ProfileId;
};

/**
 * @internal
 * @experimental
 */
export function useConversations(args: UseConversationsArgs) {
  const environment = useEnvironmentConfig();
  const storage = useInboxKeyStorage();

  const provider = useMemo(
    () => new WebConversationProvider(environment, storage),
    [environment, storage],
  );

  return useConversationsBase({
    ...args,
    config: {
      provider: provider,
    },
  });
}
