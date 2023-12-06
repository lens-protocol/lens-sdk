import { BigNumber } from '@ethersproject/bignumber';
import { ProfileOwnershipCondition } from '@lens-protocol/metadata';

import {
  AccessControlContract,
  LitConditionType,
  LitEvmAccessCondition,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from './types';
import { toLitSupportedChainName } from './utils';
import { assertValidProfileId } from './validators';

export const transformProfileCondition = (
  condition: ProfileOwnershipCondition,
  accessControlContract: AccessControlContract,
): Array<LitEvmAccessCondition> => {
  assertValidProfileId(condition.profileId);

  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: accessControlContract.address,
      chain: toLitSupportedChainName(accessControlContract.chainId),
      functionName: LitKnownMethods.HAS_ACCESS,
      functionParams: [
        LitKnownParams.USER_ADDRESS,
        BigNumber.from(condition.profileId).toString(),
        '0x',
      ],
      functionAbi: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: 'requestorAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'profileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'hasAccess',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      returnValueTest: {
        key: '',
        comparator: LitScalarOperator.EQUAL,
        value: 'true',
      },
    },
  ];
};
