import { ProfileOwnedByMe, ReadResult, useProfile } from '@lens-protocol/react';
import { Conversation } from '@xmtp/react-sdk';
import { useEffect, useState } from 'react';

import { extractPeerProfileId } from './helpers';
import { EnhancedConversation } from './types';

export type EnhanceConversationRequest = {
  profile: ProfileOwnedByMe;
  conversation: Conversation;
};

export function useEnhanceConversation({
  profile,
  conversation,
}: EnhanceConversationRequest): ReadResult<EnhancedConversation, undefined> {
  const [enhancedConversation, setEnhancedConversation] =
    useState<EnhancedConversation>(conversation);

  const peerProfileId = extractPeerProfileId(conversation.context?.conversationId, profile.id);

  const useProfileArgs = peerProfileId ? { profileId: peerProfileId } : { skip: true as const };

  const { data: peerProfile, loading } = useProfile(useProfileArgs);

  useEffect(() => {
    setEnhancedConversation((c) => {
      if (peerProfile) {
        // Clone the xmtp Conversation instance with all its methods and add peerProfile
        // eslint-disable-next-line
        return Object.assign(Object.create(Object.getPrototypeOf(c)), c, { peerProfile });
      }
      return c;
    });
  }, [peerProfile, conversation]);

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
