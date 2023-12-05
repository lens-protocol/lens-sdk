import { TransactionKind } from '@lens-protocol/domain/entities';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';

import {
  validateUpdateFollowPolicyRequest,
  validateUpdateProfileManagersRequest,
} from '../validators';

describe(`when testing the "validateUpdateFollowPolicyRequest"`, () => {
  it('should provide an actionable error message in case of misuse', () => {
    expect(() =>
      validateUpdateFollowPolicyRequest({
        kind: TransactionKind.UPDATE_FOLLOW_POLICY,
        policy: {
          type: FollowPolicyType.CHARGE,
          amount: 42,
        },
        sponsored: true,
        profileId: mockProfileId(),
        signless: true,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "fix the following issues
      · "policy.amount": expected to match one of the following groups:
      		"policy.amount": Expected object, received number
      	OR:
      		"policy.amount": Input not instance of Amount
      · "policy.recipient": Required"
    `);
  });
});

describe(`when testing the "validateUpdateProfileManagersRequest"`, () => {
  it('should provide an actionable error message in case of misuse', () => {
    expect(() =>
      validateUpdateProfileManagersRequest({
        kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
        profileId: mockProfileId(),
        sponsored: true,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        At least one of 'add', 'remove', or 'approveSignless' must be present."
      `);
  });
});
