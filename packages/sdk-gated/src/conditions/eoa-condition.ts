import { EoaOwnershipOutput } from '../graphql/types';
import {
  LitAccessCondition,
  LitConditionType,
  LitKnownParams,
  LitScalarOperator,
} from '../lit/types';
import { LensEnvironment } from '../types';
import { chainIdToString, envToChainId } from '../utils';
import { validateAddress } from '../validators';

export const validateEoaCondition = (condition: EoaOwnershipOutput): void => {
  validateAddress(condition.address);
};

export const transformEoaCondition = (condition: EoaOwnershipOutput): Array<LitAccessCondition> => {
  return [
    {
      conditionType: LitConditionType.EVM_BASIC,
      contractAddress: '', // this is intentional, its how lit implements checking for EOA ownership
      standardContractType: '', // same as above
      chain: chainIdToString(envToChainId(LensEnvironment.Polygon)),
      method: '', // same here
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: condition.address,
      },
    },
  ];
};
