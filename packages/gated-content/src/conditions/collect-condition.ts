import { BigNumber } from '@ethersproject/bignumber';
import { CollectConditionInput } from '@lens-protocol/api-bindings';
import { invariant, isNonNullable } from '@lens-protocol/shared-kernel';

import { EnvironmentConfig } from '../environments';
import {
  LitConditionType,
  LitEvmAccessCondition,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from './types';
import { toLitSupportedChainName } from './utils';
import { assertValidPublicationId } from './validators';

export const transformCollectCondition = (
  condition: CollectConditionInput,
  env: EnvironmentConfig,
): Array<LitEvmAccessCondition> => {
  invariant(isNonNullable(condition.publicationId), 'publicationId is missing');
  assertValidPublicationId(condition.publicationId);

  const [publisherId, publicationId] = condition.publicationId.split('-');

  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: env.contractAddress,
      chain: toLitSupportedChainName(env.chainId),
      functionName: LitKnownMethods.HAS_COLLECTED,
      functionParams: [
        LitKnownParams.USER_ADDRESS,
        BigNumber.from(publisherId).toString(),
        BigNumber.from(publicationId).toString(),
        BigNumber.from(0).toString(), // empty for now
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
            name: 'publisherId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pubId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'collectorProfileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: LitKnownMethods.HAS_COLLECTED,
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
