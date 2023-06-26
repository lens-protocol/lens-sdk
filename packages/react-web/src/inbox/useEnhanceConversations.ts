import {
  ProfileId,
  ProfileOwnedByMe,
  ReadResult,
  UnspecifiedError,
  useProfiles,
} from '@lens-protocol/react';
import { assertError } from '@lens-protocol/shared-kernel';
import { useConversations } from '@xmtp/react-sdk';
import { useEffect, useMemo, useState } from 'react';

import { extractPeerProfileId, createUniqueConversationId, notEmpty } from './helpers';
import { EnhancedConversation } from './types';

export type EnhanceConversationsRequest = {
  profile: ProfileOwnedByMe;
};

export function useEnhanceConversations(
  useConversationsResult: ReturnType<typeof useConversations>,
  { profile }: EnhanceConversationsRequest,
): ReadResult<EnhancedConversation[], UnspecifiedError | Error> {
  const { conversations, error: resultError, isLoading: resultLoading } = useConversationsResult;
  const [enhancedConversations, setEnhancedConversations] = useState<EnhancedConversation[]>([]);

  const conversationToProfileIdMap: Record<string, ProfileId | undefined> = useMemo(() => {
    return conversations.reduce((acc, c) => {
      const peerProfileId = extractPeerProfileId(c.context?.conversationId, profile.id);

      return {
        ...acc,
        [createUniqueConversationId(c)]: peerProfileId,
      };
    }, {});
  }, [conversations, profile.id]);

  const uniqueProfileIds: ProfileId[] = useMemo(() => {
    const ids = Object.values(conversationToProfileIdMap).filter(notEmpty);
    return [...new Set(ids)];
  }, [conversationToProfileIdMap]);

  const {
    data: profiles = [],
    error,
    loading,
  } = useProfiles({
    profileIds: uniqueProfileIds,
    skip: uniqueProfileIds.length === 0,
  });

  useEffect(() => {
    if (profiles.length > 0 && conversations.length > 0) {
      const eConversations = conversations.map((c) => {
        const id = createUniqueConversationId(c);

        const peerProfile = profiles.find((p) => p.id === conversationToProfileIdMap[id]);

        if (!peerProfile) {
          return c;
        }

        // Clone the xmtp Conversation instance with all its methods and add peerProfile
        // eslint-disable-next-line
        return Object.assign(Object.create(Object.getPrototypeOf(c)), c, { peerProfile });
      });

      setEnhancedConversations(eConversations);
    }
  }, [profiles, conversationToProfileIdMap, conversations]);

  if (loading || resultLoading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (resultError) {
    assertError(resultError);
    return {
      data: undefined,
      error: resultError,
      loading: false,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  return {
    data: enhancedConversations,
    error: undefined,
    loading: false,
  };
}
