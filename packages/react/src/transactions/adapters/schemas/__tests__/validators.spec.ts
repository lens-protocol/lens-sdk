import { TransactionKind } from '@lens-protocol/domain/entities';
import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import {
  CollectPolicyType,
  ContentFocus,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';

import {
  validateCreateCommentRequest,
  validateCreatePostRequest,
  validateTokenAllowanceRequest,
  validateUpdateFollowPolicyRequest,
} from '../validators';

describe(`Given the validator helpers`, () => {
  describe(`when testing the "validateCreatePostRequest"`, () => {
    it('should provide an actionable error message in case of "collect" policy misconfiguration', () => {
      expect(() =>
        validateCreatePostRequest({
          contentFocus: ContentFocus.TEXT_ONLY,
          content: '',
          collect: {
            type: CollectPolicyType.CHARGE,
            fee: '1',
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
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.timeLimited": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipients": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.vault": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
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

  describe(`when testing the "validateCreateCommentRequest"`, () => {
    it('should provide an actionable error message in case of "collect" policy misconfiguration', () => {
      expect(() =>
        validateCreateCommentRequest({
          contentFocus: ContentFocus.TEXT_ONLY,
          content: '',
          collect: {
            type: CollectPolicyType.CHARGE,
            fee: '1',
          },
          delegate: false,
          locale: 'en',
          kind: TransactionKind.CREATE_POST,
          offChain: false,
          profileId: mockProfileId(),
          publicationId: mockPublicationId(),
          reference: {
            type: ReferencePolicyType.ANYONE,
          },
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "collect" expected to match one of the following groups:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.timeLimited": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipients": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.vault": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
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

  describe(`when testing the "validateTokenAllowanceRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateTokenAllowanceRequest({
          amount: 42,
          kind: TransactionKind.APPROVE_MODULE,
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "amount": value not instance of Amount<Erc20>
        · "spender": Required
        · "limit": Required"
        `);
    });
  });

  describe(`when testing the "validateUpdateFollowPolicyRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateUpdateFollowPolicyRequest({
          kind: TransactionKind.UPDATE_FOLLOW_POLICY,
          policy: {
            type: FollowPolicyType.CHARGE,
            amount: 42,
          },
          profileId: mockProfileId(),
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "policy.amount": value not instance of Amount<Erc20>
        · "policy.recipient": Required"
      `);
    });
  });
});
