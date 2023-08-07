import { Profile, ProfileOwnedByMe } from '@lens-protocol/react';
import { useStartConversation } from '@xmtp/react-sdk';

import { buildConversationId } from './helpers';

/**
 * @experimental
 */
export type StartLensConversationRequest = {
  ownedProfile: ProfileOwnedByMe;
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
