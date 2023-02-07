import { BigNumber } from '@ethersproject/bignumber';
import { FollowConditionOutput } from '../graphql/types';
import {
  LitConditionType,
  LitEvmAccessCondition,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from '../lit/types';
import { LensEnvironment } from '../types';
import { chainIdToString, envToChainId } from '../utils';
import { validateProfileId } from '../validators';
import { getAccessControlContractAddress } from './utils';

export const validateFollowCondition = (condition: FollowConditionOutput): void => {
  validateProfileId(condition.profileId);
};

export const transformFollowCondition = (
  condition: FollowConditionOutput,
  env: LensEnvironment
): Array<LitEvmAccessCondition> => {
  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: getAccessControlContractAddress(env),
      chain: chainIdToString(envToChainId(env)),
      functionName: LitKnownMethods.IS_FOLLOWING,
      functionParams: [
        LitKnownParams.USER_ADDRESS,
        BigNumber.from(condition.profileId).toString(),
        BigNumber.from(0).toString(),
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
            internalType: 'uint256',
            name: 'followerProfileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: LitKnownMethods.IS_FOLLOWING,
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
