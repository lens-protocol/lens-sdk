import { BigNumber } from '@ethersproject/bignumber';
import { ValidationError } from '../error';
import { AccessConditionOutput, CollectConditionOutput } from '../graphql/types';
import LensAPIClient from '../lens/client';
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

export const validateCollectCondition = (condition: CollectConditionOutput): void => {
  if (
    (!condition.thisPublication && !condition.publicationId) ||
    (condition.thisPublication && condition.publicationId)
  ) {
    throw new ValidationError(
      'Invalid collect condition, have to either supply publicationId or set thisPublication true'
    );
  }
  if (condition.publicationId) {
    validatePublicationId(condition.publicationId);
  }
};

export const convertToNamedPublicationId = async (
  condition: CollectConditionOutput,
  creatorProfileId: string,
  api: LensAPIClient
): Promise<CollectConditionOutput> => {
  if (condition.publicationId) {
    return condition;
  }

  let publicationId = '0x01';

  const lastPublicationId = await api.getLastPublicationIdForProfileId(creatorProfileId);
  if (lastPublicationId) {
    let [_, lastPubId] = lastPublicationId.split('-');
    publicationId = BigNumber.from(lastPubId).add(1).toHexString();
  }

  return {
    publicationId: `${creatorProfileId}-${publicationId}`,
  };
};

export const transformCollectCondition = async (
  condition: CollectConditionOutput,
  env: LensEnvironment
): Promise<Array<LitEvmAccessCondition>> => {
  let publisherId, publicationId;

  if (condition.thisPublication) {
    throw new ValidationError(
      'transformer should not be called until the collect condition has been converted to a named publication id'
    );
  }

  [publisherId, publicationId] = condition.publicationId!.split('-');

  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: getAccessControlContractAddress(env),
      chain: chainIdToString(envToChainId(env)),
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

export const populateCollects = async (
  rootCondition: AccessConditionOutput,
  creatorProfileId: string,
  client: LensAPIClient
): Promise<AccessConditionOutput> => {
  if (rootCondition.collect) {
    return {
      collect: await convertToNamedPublicationId(rootCondition.collect, creatorProfileId, client),
    };
  }
  if (rootCondition.and) {
    return {
      and: {
        criteria: await Promise.all(
          rootCondition.and.criteria.map(async (condition) => {
            if (condition.collect) {
              return await populateCollects(condition, creatorProfileId, client);
            }
            return condition;
          })
        ),
      },
    };
  }
  if (rootCondition.or) {
    return {
      or: {
        criteria: await Promise.all(
          rootCondition.or.criteria.map(async (condition) => {
            if (condition.collect) {
              return await populateCollects(condition, creatorProfileId, client);
            }
            return condition;
          })
        ),
      },
    };
  }
  return rootCondition;
};
