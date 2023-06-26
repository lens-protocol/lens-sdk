import {
  buildConversationId,
  extractPeerProfileId,
  parseConversationId,
} from '../conversationIdUtils';

describe('Given a collection of inbox helper functions', () => {
  describe('when calling buildConversationId', () => {
    it('should build the same conversationId for provided two profiles, no matter the order', () => {
      const result1 = buildConversationId('0x15', '0x18');
      const result2 = buildConversationId('0x18', '0x15');

      expect(result1).toEqual(result2);
    });
  });

  describe('when calling parseConversationId', () => {
    it('should return two profileIds', () => {
      const conversationId = buildConversationId('0x15', '0x18');
      const result = parseConversationId(conversationId);

      expect(result).toEqual(['0x15', '0x18']);
    });
  });

  describe('when calling extractPeerProfileId', () => {
    it('should return peer profileId', () => {
      const conversationId = buildConversationId('0x15', '0x18');

      const result1 = extractPeerProfileId(conversationId, '0x15');
      const result2 = extractPeerProfileId(conversationId, '0x18');

      expect(result1).toBe('0x18');
      expect(result2).toBe('0x15');
    });
  });
});
