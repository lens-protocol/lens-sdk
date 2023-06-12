import {
  useEnableConversations as useEnableConversationsBase,
  useEnvironmentConfig,
  useInboxKeyStorage,
} from '@lens-protocol/react';
import { useMemo } from 'react';

import { WebConversationProvider } from './adapters/WebConversationProvider';

/**
 * @internal
 * @experimental
 */
export function useEnableConversations() {
  const environment = useEnvironmentConfig();
  const storage = useInboxKeyStorage();

  const provider = useMemo(
    () => new WebConversationProvider(environment, storage),
    [environment, storage],
  );

  return useEnableConversationsBase({
    config: {
      provider,
    },
  });
}
