import { BigNumber } from '@ethersproject/bignumber';
import { ProfileOwnershipOutput } from '../graphql/types';
import {
  LitConditionType,
  LitEvmAccessCondition,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from '../lit/types';
import { LensEnvironment } from '../types';
import { chainIdToString, envToChainId } from '../utils';
import { validatePublicationId } from '../validators';
import { getAccessControlContractAddress } from './utils';

export const validateProfileCondition = (condition: ProfileOwnershipOutput): void => {
  validatePublicationId(condition.profileId);
};

export const transformProfileCondition = (
  condition: ProfileOwnershipOutput,
  env: LensEnvironment
): Array<LitEvmAccessCondition> => {
  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: getAccessControlContractAddress(env),
      chain: chainIdToString(envToChainId(env)),
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
