import { ProfileId, profileId as brandProfileId } from '@lens-protocol/react';
import { invariant } from '@lens-protocol/shared-kernel';

const CONVERSATION_ID_PREFIX = 'lens.dev/dm';

export function buildConversationId(profileIdA: string, profileIdB: string) {
  const profileIdAParsed = parseInt(profileIdA, 16);
  const profileIdBParsed = parseInt(profileIdB, 16);
  return profileIdAParsed < profileIdBParsed
    ? `${CONVERSATION_ID_PREFIX}/${profileIdA}-${profileIdB}`
    : `${CONVERSATION_ID_PREFIX}/${profileIdB}-${profileIdA}`;
}

export function parseConversationId(conversationId: string): [string, string] {
  const conversationIdWithoutPrefix = conversationId.replace(`${CONVERSATION_ID_PREFIX}/`, '');
  const [profileIdA, profileIdB] = conversationIdWithoutPrefix.split('-');

  invariant(profileIdA && profileIdB, 'Invalid conversation id');

  return [profileIdA, profileIdB];
}

export function isLensConversation(
  activeProfileId: string,
  conversationId?: string,
): conversationId is string {
  if (conversationId && conversationId.includes(activeProfileId)) {
    return true;
  }
  return false;
}

export function extractPeerProfileId(
  conversationId: string | undefined,
  activeProfileId: string,
): ProfileId | undefined {
  if (isLensConversation(activeProfileId, conversationId)) {
    const [profileIdA, profileIdB] = parseConversationId(conversationId);
    const result = profileIdA === activeProfileId ? profileIdB : profileIdA;

    return brandProfileId(result);
  }
  return undefined;
}
