import { ProfileId, SessionType, useLazyProfiles, useSession } from '@lens-protocol/react';
import { Prettify, assertError, invariant } from '@lens-protocol/shared-kernel';
import { useConversations } from '@xmtp/react-sdk';
import { useEffect, useMemo } from 'react';

import { extractPeerProfileId, createUniqueConversationId, notEmpty } from './helpers';
import { EnhancedConversation } from './types';

/**
 * @experimental
 */
export type UseEnhanceConversationsResult = Prettify<
  ReturnType<typeof useConversations> & {
    conversations: EnhancedConversation[];
  }
>;

/**
 * Enhance XMTP conversations with profiles of the conversations' peers,
 * if conversation is between two Lens profiles.
 *
 * You MUST be authenticated via `useLogin` to use this hook.
 *
 * @example
 * ```tsx
 * import { useConversations } from '@xmtp/react-sdk';
 *
 * const { data: conversations, error, loading } = useEnhanceConversations(useConversations());
 * ```
 * @category Inbox
 * @group Hooks
 * @experimental
 */
export function useEnhanceConversations(
  useConversationsResult: ReturnType<typeof useConversations>,
): UseEnhanceConversationsResult {
  const { data: session } = useSession();
  const { conversations, error: resultError, isLoading: resultLoading } = useConversationsResult;

  invariant(
    session?.authenticated,
    'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
  );
  invariant(
    session.type === SessionType.WithProfile,
    'You must have a profile to use this operation.',
  );

  const conversationToProfileIdMap: Record<string, ProfileId | undefined> = useMemo(() => {
    return conversations.reduce((acc, c) => {
      const peerProfileId = extractPeerProfileId(c.context?.conversationId, session.profile.id);

      return {
        ...acc,
        [createUniqueConversationId(c)]: peerProfileId,
      };
    }, {});
  }, [conversations, session.profile.id]);

  const uniqueProfileIds: ProfileId[] = useMemo(() => {
    const ids = Object.values(conversationToProfileIdMap).filter(notEmpty);
    return [...new Set(ids)];
  }, [conversationToProfileIdMap]);

  const { data: profiles, error, loading, execute } = useLazyProfiles();

  const skip = uniqueProfileIds.length === 0;

  useEffect(() => {
    if (uniqueProfileIds.length !== 0) {
      void execute({ where: { profileIds: uniqueProfileIds } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueProfileIds]);

  const enhancedConversations = useMemo((): EnhancedConversation[] => {
    if (profiles && profiles.length > 0 && conversations.length > 0) {
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
      conversations: conversations,
      error: null,
      isLoading: false,
      isLoaded: true,
    };
  }

  if (loading || resultLoading) {
    return {
      conversations: [],
      error: null,
      isLoading: true,
      isLoaded: false,
    };
  }

  if (resultError) {
    assertError(resultError);
    return {
      conversations: [],
      error: resultError,
      isLoading: false,
      isLoaded: true,
    };
  }

  if (error) {
    return {
      conversations: [],
      error,
      isLoading: false,
      isLoaded: true,
    };
  }

  return {
    conversations: enhancedConversations,
    error: null,
    isLoading: false,
    isLoaded: true,
  };
}
