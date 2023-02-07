import { InvalidAccessCriteriaError } from '../error';
import { AndConditionOutput } from '../graphql/types';
import LensAPIClient from '../lens/client';
import { AccessConditionType, LensEnvironment } from '../types';
import { handleBooleanTransform } from './';

export const validateBooleanCondition = (
  condition: AndConditionOutput,
  isRootCondition: boolean
): void => {
  if (!condition.criteria || condition.criteria.length < 2) {
    throw new InvalidAccessCriteriaError('AND condition must have at least 2 criteria.');
  }
  if (condition.criteria.length > 5) {
    throw new InvalidAccessCriteriaError('AND conditions can only have up to 5 criteria.');
  }

  const nestedBooleansExist = condition.criteria
    .map((c) => Object.keys(c)[0])
    .some((c) => c === AccessConditionType.And || c === AccessConditionType.Or);
  if (nestedBooleansExist && !isRootCondition) {
    throw new InvalidAccessCriteriaError(
      'Boolean conditions can not contain other boolean conditions.'
    );
  }
};

export const transformAndCondition = async (
  andCondition: AndConditionOutput,
  env: LensEnvironment
) => {
  return handleBooleanTransform(andCondition.criteria, AccessConditionType.And, env);
};
