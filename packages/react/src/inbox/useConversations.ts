import type { Profile, UnspecifiedError } from '@lens-protocol/api-bindings';
import type { ConversationId, ProfileId } from '@lens-protocol/domain/entities';
import type { ConversationData, LastMessageData } from '@lens-protocol/domain/use-cases/inbox';
import type { EthereumAddress } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import type { ReadResult } from '../helpers/reads';
import { useProfiles } from '../profile';
import { profileId } from '../utils';
import { useGetConversationsController } from './adapters/useGetConversationsController';
import type { InboxConfig } from './config';
import { notEmpty } from './helpers';

function extractUniqueProfileIds(conversations: ConversationData[]): ProfileId[] {
  const ids = conversations
    .map((convos) => (convos.peer.profileId ? profileId(convos.peer.profileId) : null))
    .filter(notEmpty);

  return [...new Set(ids)];
}

export type OverviewConversation = {
  id: ConversationId;
  peerAddress: EthereumAddress;
  peerProfile?: Profile;
  lastMessage: LastMessageData;
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
): ReadResult<OverviewConversation[], UnspecifiedError> {
  const execute = useGetConversationsController(args.config);

  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [overviewConversations, setOverviewConversations] = useState<OverviewConversation[]>([]);
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

  const {
    data: profiles = [],
    error: errorProfiles,
    loading: loadingProfiles,
  } = useProfiles({
    profileIds: extractUniqueProfileIds(conversations),
  });

  useEffect(() => {
    if (profiles.length > 0 && conversations.length > 0) {
      const convos = conversations.map((convo) => {
        const peerProfile = profiles.find((p) => p.id === convo.peer.profileId);

        return {
          id: convo.id,
          peerAddress: convo.peer.address,
          peerProfile,
          lastMessage: convo.lastMessage,
        };
      });

      setOverviewConversations(convos);
    }
  }, [profiles, conversations]);

  if (loading || loadingProfiles) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (errorProfiles) {
    return {
      data: undefined,
      error: errorProfiles,
      loading: false,
    };
  }

  return {
    data: overviewConversations,
    error: undefined,
    loading: false,
  };
}
