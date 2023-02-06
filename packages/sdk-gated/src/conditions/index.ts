import { InvalidAccessCriteriaError } from '../error';
import {
  AccessConditionOutput,
  AndConditionOutput,
  CollectConditionOutput,
  EoaOwnershipOutput,
  Erc20OwnershipOutput,
  FollowConditionOutput,
  NftOwnershipOutput,
  OrConditionOutput,
  ProfileOwnershipOutput,
} from '../graphql/types';
import { LitAccessCondition, LitEvmAccessCondition, LitOperator } from '../lit/types';
import { AccessConditionType, LensEnvironment } from '../types';
import { transformAndCondition, validateBooleanCondition } from './and-condition';
import { transformCollectCondition, validateCollectCondition } from './collect-condition';
import { transformEoaCondition, validateEoaCondition } from './eoa-condition';
import { transformFollowCondition, validateFollowCondition } from './follow-condition';
import { transformNftCondition, validateNftCondition } from './nft-condition';
import { transformOrCondition, validateOrCondition } from './or-condition';
import { transformProfileCondition, validateProfileCondition } from './profile-condition';
import { transformErc20Condition, validateErc20Condition } from './token-condition';
import { insertObjectInBetweenArrayElements } from './utils';

export const validate = (input: AccessConditionOutput): void => {
  const keys = Object.entries(input)
    .filter(([key, value]) => !!value && key !== '__typename')
    .map(([key, _]) => key);
  if (keys.length !== 1) {
    throw new InvalidAccessCriteriaError(
      'Access condition must have exactly one condition at the root level'
    );
  }
  const type = keys[0] as keyof AccessConditionOutput;
  const condition: any = input[type]!;
  switch (type) {
    case AccessConditionType.And:
      return validateBooleanCondition(condition as AndConditionOutput, true);
    case AccessConditionType.Or:
      return validateOrCondition(condition as OrConditionOutput, true);
    case AccessConditionType.Eoa:
      return validateEoaCondition(condition as EoaOwnershipOutput);
    case AccessConditionType.Token:
      return validateErc20Condition(condition as Erc20OwnershipOutput);
    case AccessConditionType.Nft:
      return validateNftCondition(condition as NftOwnershipOutput);
    case AccessConditionType.Profile:
      return validateProfileCondition(condition as ProfileOwnershipOutput);
    case AccessConditionType.Follow:
      return validateFollowCondition(condition as FollowConditionOutput);
    case AccessConditionType.Collect:
      return validateCollectCondition(condition as CollectConditionOutput);
    default:
      throw new InvalidAccessCriteriaError(`Unknown access criteria type: ${type}`);
  }
};

export const transform = async (
  condition: AccessConditionOutput,
  env: LensEnvironment
): Promise<
  Array<
    | LitAccessCondition
    | LitEvmAccessCondition
    | LitOperator
    | Array<LitAccessCondition | LitEvmAccessCondition | LitOperator>
  >
> => {
  const keys = Object.entries(condition)
    .filter(([key, value]) => !!value && key !== '__typename')
    .map(([key, _]) => key);
  if (keys.length !== 1) {
    throw new InvalidAccessCriteriaError(
      'Access condition must have exactly one condition at the root level'
    );
  }
  const type = keys[0];
  switch (type) {
    case AccessConditionType.And:
      return transformAndCondition(condition[type] as AndConditionOutput, env);
    case AccessConditionType.Or:
      return transformOrCondition(condition[type] as OrConditionOutput, env);
    case AccessConditionType.Eoa:
      return transformEoaCondition(condition[type] as EoaOwnershipOutput);
    case AccessConditionType.Token:
      return transformErc20Condition(condition[type] as Erc20OwnershipOutput);
    case AccessConditionType.Nft:
      return transformNftCondition(condition[type] as NftOwnershipOutput);
    case AccessConditionType.Profile:
      return transformProfileCondition(condition[type] as ProfileOwnershipOutput, env);
    case AccessConditionType.Collect:
      return transformCollectCondition(condition[type] as CollectConditionOutput, env);
    case AccessConditionType.Follow:
      return transformFollowCondition(condition[type] as FollowConditionOutput, env);
    default:
      throw new InvalidAccessCriteriaError(`Unknown access criteria type: ${type}`);
  }
};

export const wrapWithProfileCondition = (
  condition: AccessConditionOutput,
  profileId: string
): AccessConditionOutput => {
  const wrapped = {
    or: {
      criteria: [
        {
          profile: {
            profileId,
          },
        },
        condition,
      ],
    },
  };

  validate(wrapped);
  return wrapped;
};

export const handleBooleanTransform = async (
  criteria: AccessConditionOutput[],
  operator: AccessConditionType.And | AccessConditionType.Or,
  env: LensEnvironment
): Promise<
  Array<
    | LitAccessCondition
    | LitEvmAccessCondition
    | LitOperator
    | Array<LitAccessCondition | LitEvmAccessCondition | LitOperator>
  >
> => {
  // boolean transform supports one level of nesting
  const transformedCriteria = await Promise.all(
    criteria.map((condition) => {
      return transform(condition as AccessConditionOutput, env);
    })
  );
  const flattened = transformedCriteria.reduce((acc, val) => {
    if (Array.isArray(val) && val.length === 1) {
      return acc.concat(val);
    } else {
      // handle nested conditions
      acc.push(val as (LitAccessCondition | LitEvmAccessCondition | LitOperator)[]);
      return acc;
    }
  }, []);
  return insertObjectInBetweenArrayElements(flattened, { operator });
};
