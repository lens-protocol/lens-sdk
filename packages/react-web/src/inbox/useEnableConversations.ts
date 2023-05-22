import {
  ProfileId,
  useEnableConversations as useEnableConversationsBase,
  useEnvironmentConfig,
  useInboxKeyStorage,
} from '@lens-protocol/react';
import { useMemo } from 'react';

import { WebConversationProvider } from './adapters/WebConversationProvider';

export type UseEnableConversationsArgs = {
  profileId?: ProfileId;
};

/**
 * @internal
 * @experimental
 */
export function useEnableConversations(args: UseEnableConversationsArgs) {
  const environment = useEnvironmentConfig();
  const storage = useInboxKeyStorage();

  const provider = useMemo(
    () => new WebConversationProvider(environment, storage),
    [environment, storage],
  );

  return useEnableConversationsBase({
    ...args,
    config: {
      provider,
    },
  });
}
