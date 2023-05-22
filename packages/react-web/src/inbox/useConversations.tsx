import {
  EthereumAddress,
  ProfileId,
  useActiveWalletSigner,
  useConversations as useConversationsBase,
  useEnvironmentConfig,
} from '@lens-protocol/react';
import { useEffect, useRef } from 'react';

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
  const { data: signer } = useActiveWalletSigner();
  const provider = useRef<WebConversationProvider>(new WebConversationProvider(environment.name));

  useEffect(() => {
    if (signer) {
      provider.current.setSigner(signer);
    }
  }, [signer]);

  return useConversationsBase({
    ...args,
    config: {
      provider: provider.current,
    },
  });
}
