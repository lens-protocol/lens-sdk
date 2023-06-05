import { TransactionKind } from '@lens-protocol/domain/entities';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import {
  CollectPolicyType,
  ContentFocus,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';

import { validateCreatePostRequest } from '../validators';

describe(`Given the validator helpers`, () => {
  describe(`when testing the "validateCreatePostRequest"`, () => {
    it('should provide an actionable error message in case of "collect" policy misconfiguration', () => {
      expect(() =>
        validateCreatePostRequest({
          contentFocus: ContentFocus.TEXT_ONLY,
          content: '',
          collect: {
            type: CollectPolicyType.CHARGE,
          },
          delegate: false,
          locale: 'en',
          kind: TransactionKind.CREATE_POST,
          offChain: false,
          profileId: mockProfileId(),
          reference: {
            type: ReferencePolicyType.ANYONE,
          },
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "collect" expected to match one of the following groups:
        		· "collect.fee": Required
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.timeLimited": Required
        	OR:
        		· "collect.fee": Required
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipients": Required
        	OR:
        		· "collect.fee": Required
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.vault": Required
        	OR:
        		· "collect.fee": Required
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.depositToAave": Invalid literal value, expected true
        	OR:
        		· "collect.type": Invalid literal value, expected "FREE"
        		· "collect.metadata": Required
        		· "collect.followersOnly": Required
        	OR:
        		· "collect.type": Invalid literal value, expected "NO_COLLECT""
      `);
    });

    it('should provide an actionable error message in case of "reference" policy misconfiguration', () => {
      expect(() =>
        validateCreatePostRequest({
          contentFocus: ContentFocus.TEXT_ONLY,
          content: '',
          collect: {
            type: CollectPolicyType.NO_COLLECT,
          },
          delegate: false,
          locale: 'en',
          kind: TransactionKind.CREATE_POST,
          offChain: false,
          profileId: mockProfileId(),
          reference: {
            type: ReferencePolicyType.DEGREES_OF_SEPARATION,
          },
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "reference.params": Required"
      `);
    });
  });
});
