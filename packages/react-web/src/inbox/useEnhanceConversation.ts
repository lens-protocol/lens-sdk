import { ProfileId, useLazyProfile, useSession, SessionType } from '@lens-protocol/react';
import { invariant } from '@lens-protocol/shared-kernel';
import { CachedConversation } from '@xmtp/react-sdk';
import { useEffect, useMemo } from 'react';

import { extractPeerProfileId } from './helpers';
import { EnhancedConversation } from './types';

/**
 * @experimental
 */
export type UseEnhanceConversationRequest = {
  /**
   * XMTP conversation to enhance
   */
  conversation: CachedConversation;
};

/**
 * @experimental
 */
export type UseEnhanceConversationResult = {
  conversation: EnhancedConversation;
  error: Error | null;
  isLoaded: boolean;
  isLoading: boolean;
};

/**
 * Enhance XMTP conversation with a profile of the conversation's peer
 *
 * You MUST be authenticated via `useLogin` to use this hook.
 *
 * @example
 * ```tsx
 * const { data: enhancedConversation, loading } = useEnhanceConversation({
 *   conversation,
 * });
 * ```
 * @param args - {@link UseEnhanceConversationRequest}
 * @category Inbox
 * @group Hooks
 * @experimental
 */
export function useEnhanceConversation({
  conversation,
}: UseEnhanceConversationRequest): UseEnhanceConversationResult {
  const { data: session } = useSession();

  invariant(
    session?.authenticated,
    'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
  );
  invariant(
    session.type === SessionType.WithProfile,
    'You must have a profile to use this operation.',
  );

  const peerProfileId = useMemo(
    (): ProfileId | undefined =>
      extractPeerProfileId(conversation.context?.conversationId, session.profile.id),
    [conversation, session.profile],
  );

  const { data: peerProfile, error, loading, execute } = useLazyProfile();

  useEffect(() => {
    if (peerProfileId) {
      void execute({ forProfileId: peerProfileId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerProfileId]);

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

  if (peerProfileId === undefined) {
    return {
      conversation,
      error: null,
      isLoading: false,
      isLoaded: true,
    };
  }

  if (loading) {
    return {
      conversation,
      error: null,
      isLoading: true,
      isLoaded: false,
    };
  }

  if (error) {
    return {
      conversation,
      error,
      isLoading: false,
      isLoaded: true,
    };
  }

  return {
    conversation: enhancedConversation,
    error: null,
    isLoading: false,
    isLoaded: true,
  };
}
