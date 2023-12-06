import { BigNumber } from '@ethersproject/bignumber';
import { CollectCondition } from '@lens-protocol/metadata';
import { invariant, isNonNullable } from '@lens-protocol/shared-kernel';

import {
  AccessControlContract,
  DecryptionContext,
  LitConditionType,
  LitEvmAccessCondition,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from './types';
import { toLitSupportedChainName } from './utils';
import { assertValidPublicationId } from './validators';

export const transformCollectCondition = (
  condition: CollectCondition,
  accessControlContract: AccessControlContract,
  context?: DecryptionContext,
): Array<LitEvmAccessCondition> => {
  invariant(isNonNullable(condition.publicationId), 'publicationId is missing');
  assertValidPublicationId(condition.publicationId);

  const [publisherId, publicationId] = condition.publicationId.split('-');

  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: accessControlContract.address,
      chain: toLitSupportedChainName(accessControlContract.chainId),
      functionName: LitKnownMethods.HAS_COLLECTED,
      functionParams: [
        LitKnownParams.USER_ADDRESS,
        BigNumber.from(publisherId).toString(),
        BigNumber.from(publicationId).toString(),
        context?.profileId ?? BigNumber.from(0).toString(),
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
