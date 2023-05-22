const CONVERSATION_ID_PREFIX = 'lens.dev/dm';

export function buildConversationId(profileIdA: string, profileIdB: string) {
  const profileIdAParsed = parseInt(profileIdA, 16);
  const profileIdBParsed = parseInt(profileIdB, 16);

  return profileIdAParsed < profileIdBParsed
    ? `${CONVERSATION_ID_PREFIX}/${profileIdA}-${profileIdB}`
    : `${CONVERSATION_ID_PREFIX}/${profileIdB}-${profileIdA}`;
}

export function parseConversationId(conversationId: string) {
  const conversationIdWithoutPrefix = conversationId.replace(`${CONVERSATION_ID_PREFIX}/`, '');
  const [profileIdA, profileIdB] = conversationIdWithoutPrefix.split('-');

  return [profileIdA, profileIdB];
}

export function extractPeerProfileId(conversationId: string, activeProfileId: string) {
  const [profileIdA, profileIdB] = parseConversationId(conversationId);

  return profileIdA === activeProfileId ? profileIdB : profileIdA;
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

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
