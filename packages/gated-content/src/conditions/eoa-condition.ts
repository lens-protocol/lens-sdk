import { EoaOwnershipInput } from '@lens-protocol/api-bindings';

import {
  LitAccessCondition,
  LitConditionType,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from './types';
import { assertValidAddress } from './validators';

export const transformEoaCondition = (condition: EoaOwnershipInput): Array<LitAccessCondition> => {
  assertValidAddress(condition.address);

  return [
    {
      conditionType: LitConditionType.EVM_BASIC,
      contractAddress: '', // this is intentional, its how lit implements checking for EOA ownership
      standardContractType: '', // same as above
      chain: SupportedChains.POLYGON,
      method: '', // same here
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: condition.address,
      },
    },
  ];
};
