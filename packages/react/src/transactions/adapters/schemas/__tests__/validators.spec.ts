import { TransactionKind } from '@lens-protocol/domain/entities';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';

import {
  validateTokenAllowanceRequest,
  validateUpdateFollowPolicyRequest,
  validateSetProfileMetadataRequest,
  validateUpdateProfileManagersRequest,
} from '../validators';

describe(`Given the validator helpers`, () => {
  describe(`when testing the "validateTokenAllowanceRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateTokenAllowanceRequest({
          amount: 42,
          kind: TransactionKind.APPROVE_MODULE,
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "amount": expected to match one of the following groups:
        		"amount": Expected object, received number
        	OR:
        		"amount": Input not instance of Amount
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
        · "policy.amount": expected to match one of the following groups:
        		"policy.amount": Expected object, received number
        	OR:
        		"policy.amount": Input not instance of Amount
        · "policy.recipient": Required
        · "delegate": Required"
      `);
    });
  });

  describe(`when testing the "validateSetProfileMetadataRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateSetProfileMetadataRequest({
          attributes: {
            foo: new RegExp('foo'),
          },
          bio: 42,
          coverPicture: null,
          delegate: false,
          kind: TransactionKind.UPDATE_PROFILE_DETAILS,
          policy: {
            type: FollowPolicyType.CHARGE,
            amount: 42,
          },
          profileId: mockProfileId(),
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
              "fix the following issues
              · "metadataURI": Required"
          `);
    });
  });

  describe(`when testing the "validateUpdateProfileManagersRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateUpdateProfileManagersRequest({
          kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
          profileId: mockProfileId(),
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        At least one of 'add', 'remove', or 'approveSignless' must be present."
      `);
    });
  });
});
