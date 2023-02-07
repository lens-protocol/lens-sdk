import { AndConditionOutput, OrConditionOutput } from '../graphql/types';
import { AccessConditionType, LensEnvironment } from '../types';
import { handleBooleanTransform } from './';
import { validateBooleanCondition } from './and-condition';

export const validateOrCondition = (
  condition: OrConditionOutput,
  isRootCondition: boolean
): void => {
  return validateBooleanCondition(condition as AndConditionOutput, isRootCondition);
};

export const transformOrCondition = async (condition: OrConditionOutput, env: LensEnvironment) => {
  return handleBooleanTransform(condition.criteria, AccessConditionType.Or, env);
};
