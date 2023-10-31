import {
  ProfileId,
  Profile,
  ReadResult,
  useLazyProfile,
  NotFoundError,
  UnspecifiedError,
} from '@lens-protocol/react';
import { CachedConversation } from '@xmtp/react-sdk';
import { useEffect, useMemo } from 'react';

import { extractPeerProfileId } from './helpers';
import { EnhancedConversation } from './types';

/**
 * @experimental
 */
export type EnhanceConversationRequest = {
  /**
   * Currently authenticated profile
   */
  profile: Profile;
  /**
   * XMTP conversation to enhance
   */
  conversation: CachedConversation;
};

/**
 * Enhance XMTP conversation with a profile of the conversation's peer
 *
 * @category Inbox
 * @group Hooks
 * @experimental
 *
 * @param args - {@link EnhanceConversationRequest}
 *
 * @example
 * ```tsx
 * const { data: enhancedConversation, loading } = useEnhanceConversation({
 *   conversation,
 *   profile: session.profile,
 * });
 * ```
 */
export function useEnhanceConversation({
  profile,
  conversation,
}: EnhanceConversationRequest): ReadResult<EnhancedConversation, NotFoundError | UnspecifiedError> {
  const peerProfileId = useMemo(
    (): ProfileId | undefined =>
      extractPeerProfileId(conversation.context?.conversationId, profile.id),
    [conversation, profile],
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
      data: conversation,
      error: undefined,
      loading: false,
    };
  }

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
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
    data: enhancedConversation,
    error: undefined,
    loading: false,
  };
}
