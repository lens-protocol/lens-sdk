import { Profile, ProfileOwnedByMe } from '@lens-protocol/react';
import { useStartConversation } from '@xmtp/react-sdk';

import { buildConversationId } from './helpers';

export type StartLensConversationRequest = {
  ownedProfile: ProfileOwnedByMe;
  peerProfile: Profile;
};

export type UseStartLensConversationResult = ReturnType<typeof useStartConversation>;

export function useStartLensConversation({
  ownedProfile,
  peerProfile,
}: StartLensConversationRequest): UseStartLensConversationResult {
  return useStartConversation({
    conversationId: buildConversationId(ownedProfile.id, peerProfile.id),
    metadata: {},
  });
}
