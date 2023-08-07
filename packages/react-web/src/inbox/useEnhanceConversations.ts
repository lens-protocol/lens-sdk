import {
  ProfileId,
  ProfileOwnedByMe,
  ReadResult,
  UnspecifiedError,
  useProfiles,
} from '@lens-protocol/react';
import { assertError } from '@lens-protocol/shared-kernel';
import { useConversations } from '@xmtp/react-sdk';
import { useMemo } from 'react';

import { extractPeerProfileId, createUniqueConversationId, notEmpty } from './helpers';
import { EnhancedConversation } from './types';

/**
 * @experimental
 */
export type EnhanceConversationsRequest = {
  profile: ProfileOwnedByMe;
};

/**
 * Enhance XMTP conversations with profiles of the conversations' peers,
 * if conversation is between two Lens profiles.
 *
 * @category Inbox
 * @group Hooks
 * @experimental
 *
 * @param args - {@link EnhanceConversationsRequest}
 */
export function useEnhanceConversations(
  useConversationsResult: ReturnType<typeof useConversations>,
  { profile }: EnhanceConversationsRequest,
): ReadResult<EnhancedConversation[], UnspecifiedError | Error> {
  const { conversations, error: resultError, isLoading: resultLoading } = useConversationsResult;

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

  const skip = uniqueProfileIds.length === 0;

  const {
    data: profiles = [],
    error,
    loading,
  } = useProfiles(
    skip
      ? {
          skip: true,
        }
      : {
          profileIds: uniqueProfileIds,
        },
  );

  const enhancedConversations = useMemo((): EnhancedConversation[] => {
    if (profiles.length > 0 && conversations.length > 0) {
      const eConversations = conversations.map((c): EnhancedConversation => {
        const id = createUniqueConversationId(c);

        const peerProfile = profiles.find((p) => p.id === conversationToProfileIdMap[id]);

        if (!peerProfile) {
          return c;
        }

        // Clone the xmtp Conversation instance with all its methods and add peerProfile
        // eslint-disable-next-line
        return Object.assign(Object.create(Object.getPrototypeOf(c)), c, { peerProfile });
      });

      return eConversations;
    }
    return conversations;
  }, [profiles, conversationToProfileIdMap, conversations]);

  if (skip) {
    return {
      data: conversations,
      error: undefined,
      loading: false,
    };
  }

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
