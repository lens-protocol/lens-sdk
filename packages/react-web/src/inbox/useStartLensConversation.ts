import { Profile } from '@lens-protocol/react';
import { useStartConversation } from '@xmtp/react-sdk';

import { buildConversationId } from './helpers';

/**
 * @experimental
 */
export type StartLensConversationRequest = {
  /**
   * Currently authenticated profile
   */
  ownedProfile: Profile;
  /**
   * Profile to start a conversation with
   */
  peerProfile: Profile;
};

/**
 * @experimental
 */
export type UseStartLensConversationResult = ReturnType<typeof useStartConversation>;

/**
 * Start a new XMTP conversation between two Lens profiles
 *
 * @category Inbox
 * @group Hooks
 * @experimental
 *
 * @param args - {@link StartLensConversationRequest}
 *
 * @example
 * ```tsx
 * const { startConversation, isLoading, error } = useStartLensConversation({
 *   ownedProfile,
 *   peerProfile,
 * });
 *
 * const newConversation = await startConversation(peerProfile.ownedBy.address, firstMessage);
 * ```
 */
export function useStartLensConversation({
  ownedProfile,
  peerProfile,
}: StartLensConversationRequest): UseStartLensConversationResult {
  return useStartConversation({
    conversationId: buildConversationId(ownedProfile.id, peerProfile.id),
    metadata: {},
  });
}
