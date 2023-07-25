import { ProfileId, ProfileOwnedByMe, ReadResult, useProfile } from '@lens-protocol/react';
import { Conversation } from '@xmtp/react-sdk';
import { useMemo } from 'react';

import { extractPeerProfileId } from './helpers';
import { EnhancedConversation } from './types';

/**
 * @experimental
 */
export type EnhanceConversationRequest = {
  profile: ProfileOwnedByMe;
  conversation: Conversation;
};

/**
 * Enhance XMTP conversation with a profile of the conversation's peer
 *
 * @category Inbox
 * @group Hooks
 * @experimental
 *
 * @param args - {@link EnhanceConversationRequest}
 */
export function useEnhanceConversation({
  profile,
  conversation,
}: EnhanceConversationRequest): ReadResult<EnhancedConversation, undefined> {
  const peerProfileId = useMemo(
    (): ProfileId | undefined =>
      extractPeerProfileId(conversation.context?.conversationId, profile.id),
    [conversation, profile],
  );

  const { data: peerProfile, loading } = useProfile(
    peerProfileId
      ? {
          profileId: peerProfileId,
        }
      : {
          skip: true,
        },
  );

  const enhancedConversation = useMemo((): EnhancedConversation => {
    if (peerProfile) {
      // Clone the xmtp Conversation instance with all its methods and add peerProfile
      // eslint-disable-next-line
      return Object.assign(Object.create(Object.getPrototypeOf(conversation)), conversation, {
        peerProfile,
      });
    }
    return conversation;
  }, [conversation, peerProfile]);

  if (loading) {
    return {
      data: undefined,
      loading: true,
    };
  }

  return {
    data: enhancedConversation,
    loading: false,
  };
}
