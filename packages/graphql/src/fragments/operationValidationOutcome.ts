import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const OperationValidationPassedFragment = graphql(`
  fragment OperationValidationPassed on OperationValidationPassed {
    __typename
    restrictedSignerRequired
    extraChecksRequired {
      rule
      configParams {
        key
        value
      }
    }
  }
`);
export type OperationValidationPassed = FragmentOf<typeof OperationValidationPassedFragment>;

export const OperationValidationFailedFragment = graphql(`
  fragment OperationValidationFailed on OperationValidationFailed {
    __typename
    reason
    unsatisfiedRules {
      name
      rule
      reason
    }
  }
`);
export type OperationValidationFailed = FragmentOf<typeof OperationValidationFailedFragment>;

export const OperationValidationOutcomeFragment = graphql(
  `fragment OperationValidationOutcome on OperationValidationOutcome {
      ... on OperationValidationPassed {
        ...OperationValidationPassed
      }
      ... on OperationValidationFailed {
        ...OperationValidationFailed
      }
    }`,
  [OperationValidationFailedFragment, OperationValidationPassedFragment],
);
export type OperationValidationOutcome = FragmentOf<typeof OperationValidationOutcomeFragment>;
