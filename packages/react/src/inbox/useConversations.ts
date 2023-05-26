import type { UnspecifiedError } from '@lens-protocol/api-bindings';
import type { ProfileId } from '@lens-protocol/domain/entities';
import type { ConversationData } from '@lens-protocol/domain/use-cases/inbox';
import { EthereumAddress, invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import type { ReadResult } from '../helpers/reads';
import { useGetAllConversationsController } from './adapters/useGetAllConversationsController';
import type { InboxConfig } from './config';

export type OverviewConversation = ConversationData & {
  // TODO: fetch full profile in the presenter
  // peerProfile?: Profile;
};

export type UseConversationsArgs = {
  profileId?: ProfileId;
  address: EthereumAddress;
  config: InboxConfig;
};

/**
 * @internal
 * @experimental
 */
export function useConversations(
  args: UseConversationsArgs,
): ReadResult<ConversationData[], UnspecifiedError> {
  const execute = useGetAllConversationsController(args.config);

  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const convos = await execute({
        profileId: args.profileId,
        address: args.address,
      });
      setConversations(convos);
      setLoading(false);
    })();
  }, [execute, args.profileId, args.address]);

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  invariant(conversations, 'Conversations should be defined at this point');

  return {
    data: conversations,
    error: undefined,
    loading: false,
  };
}
