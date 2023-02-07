import { EnvironmentError, InvalidAccessCriteriaError } from '../error';
import {
  AccessConditionOutput,
  AndConditionOutput,
  Erc20OwnershipOutput,
  ScalarOperator,
} from '../graphql/types';
import { LitOperator, LitScalarOperator } from '../lit/types';
import { AccessConditionType, LensEnvironment } from '../types';

export const getChainId = (condition: AccessConditionOutput, fallback: number): number => {
  const keys = Object.keys(condition);
  const type = keys[0] as keyof AccessConditionOutput;
  switch (type) {
    case AccessConditionType.And:
    case AccessConditionType.Or:
      const firstCriterion = (condition[type] as AndConditionOutput).criteria[0];
      return getChainId(firstCriterion as AccessConditionOutput, fallback);
    case AccessConditionType.Token:
    case AccessConditionType.Nft:
      return (condition[type] as Erc20OwnershipOutput).chainID;
    case AccessConditionType.Eoa:
    case AccessConditionType.Follow:
    case AccessConditionType.Profile:
    case AccessConditionType.Collect:
      return fallback;
    default:
      throw new InvalidAccessCriteriaError(`Unknown access criteria type: ${type}`);
  }
};

export const getAccessControlContractAddress = (env: LensEnvironment) => {
  switch (env) {
    case LensEnvironment.MumbaiSandbox:
      return '0xcc44c4e8066fFA4acfb619A82dCF918263045c87';
    case LensEnvironment.Mumbai:
      return '0x8fc44e306CCc61D7ab20Cf743247cfa330ac35bF';
    case LensEnvironment.Polygon:
      return '0xE1A4f40b74f6E91159ffBd95489FE74Efe71fD97';
    default:
      throw new EnvironmentError(`Invalid Lens Environment ${env}`);
  }
};

export const getScalarOperatorSymbol = (
  operator: ScalarOperator | LitScalarOperator
): LitScalarOperator => {
  switch (operator) {
    case ScalarOperator.Equal:
    case LitScalarOperator.EQUAL:
      return LitScalarOperator.EQUAL;
    case ScalarOperator.GreaterThan:
    case LitScalarOperator.GREATER_THAN:
      return LitScalarOperator.GREATER_THAN;
    case ScalarOperator.GreaterThanOrEqual:
    case LitScalarOperator.GREATER_THAN_OR_EQUAL:
      return LitScalarOperator.GREATER_THAN_OR_EQUAL;
    case ScalarOperator.LessThan:
    case LitScalarOperator.LESS_THAN:
      return LitScalarOperator.LESS_THAN;
    case ScalarOperator.LessThanOrEqual:
    case LitScalarOperator.LESS_THAN_OR_EQUAL:
      return LitScalarOperator.LESS_THAN_OR_EQUAL;
    case ScalarOperator.NotEqual:
    case LitScalarOperator.NOT_EQUAL:
      return LitScalarOperator.NOT_EQUAL;
    default:
      throw new InvalidAccessCriteriaError(`Unsupported scalar operator condition ${operator}.`);
  }
};

export const insertObjectInBetweenArrayElements = <T>(
  array: Array<T>,
  objectToInsert: LitOperator
): Array<T | LitOperator> => {
  const results: Array<T | LitOperator> = [];
  for (let i = 0; i < array.length; i++) {
    results.push(array[i]);
    if (i !== array.length - 1) {
      results.push(objectToInsert);
    }
  }
  return results;
};
