import { Profile, SessionType, useSession } from '@lens-protocol/react';
import { invariant } from '@lens-protocol/shared-kernel';
import { useStartConversation } from '@xmtp/react-sdk';

import { buildConversationId } from './helpers';

/**
 * @experimental
 */
export type StartLensConversationRequest = {
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
 * Start a new XMTP conversation between two Lens profiles.
 *
 * You MUST be authenticated via `useLogin` to use this hook.
 *
 * @example
 * ```tsx
 * const { startConversation, isLoading, error } = useStartLensConversation({
 *   peerProfile,
 * });
 *
 * const newConversation = await startConversation(peerProfile.ownedBy.address, firstMessage);
 * ```
 * @category Inbox
 * @group Hooks
 * @experimental
 */
export function useStartLensConversation(
  args: StartLensConversationRequest,
): UseStartLensConversationResult {
  const { data: session } = useSession();

  invariant(
    session?.authenticated,
    'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
  );
  invariant(
    session.type === SessionType.WithProfile,
    'You must have a profile to use this operation.',
  );

  return useStartConversation({
    conversationId: buildConversationId(session.profile.id, args.peerProfile.id),
    metadata: {},
  });
}
