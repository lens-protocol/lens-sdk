import {
  EthereumAddress,
  ProfileId,
  useEnableConversations as useEnableConversationsBase,
  useEnvironmentConfig,
} from '@lens-protocol/react';
import { useRef } from 'react';

import { WebConversationProvider } from './WebConversationProvider';

export type UseEnableConversationsArgs = {
  profileId?: ProfileId;
  address: EthereumAddress;
};

/**
 * @internal
 * @experimental
 */
export function useEnableConversations(args: UseEnableConversationsArgs) {
  const environment = useEnvironmentConfig();
  const provider = useRef<WebConversationProvider>(new WebConversationProvider(environment.name));

  return useEnableConversationsBase({
    ...args,
    config: {
      provider: provider.current,
    },
  });
}
