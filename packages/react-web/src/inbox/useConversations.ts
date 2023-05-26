import {
  EthereumAddress,
  ProfileId,
  useConversations as useConversationsBase,
  useEnvironmentConfig,
} from '@lens-protocol/react';
import { useRef } from 'react';

import { WebConversationProvider } from './WebConversationProvider';

export type UseConversationsArgs = {
  profileId?: ProfileId;
  address: EthereumAddress;
};

/**
 * @internal
 * @experimental
 */
export function useConversations(args: UseConversationsArgs) {
  const environment = useEnvironmentConfig();
  const provider = useRef<WebConversationProvider>(new WebConversationProvider(environment.name));

  return useConversationsBase({
    ...args,
    config: {
      provider: provider.current,
    },
  });
}
