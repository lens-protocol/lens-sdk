import { FieldFunctionOptions } from '@apollo/client';
import { ProfileId } from '@lens-protocol/domain/entities';

import { HandleInfo, StrictTypedTypePolicies } from '../../../lens';
import { getPendingLinkHandleTxFor, getPendingUnlinkHandleTxFor } from '../transactions';

function buildHandleInfo({
  fullHandle,
  profileId,
}: {
  fullHandle: string;
  profileId: ProfileId;
}): HandleInfo {
  const namespace = fullHandle.split('/')[0] || '';
  const localName = fullHandle.split('/')[1] || '';

  return {
    __typename: 'HandleInfo',
    id: '',
    fullHandle: fullHandle,
    namespace,
    localName,
    ownedBy: '',
    suggestedFormatted: { full: `${namespace}/@${localName}`, localName: `@${localName}` },
    linkedTo: {
      nftTokenId: profileId,
      contract: {
        __typename: 'NetworkAddress',
        address: '',
        chainId: 1,
      },
    },
  };
}

export function createProfileTypePolicy(): StrictTypedTypePolicies['Profile'] {
  return {
    fields: {
      handle: {
        read(
          existing: HandleInfo | undefined,
          { readField }: FieldFunctionOptions,
        ): HandleInfo | undefined {
          const profileId = readField('id') as ProfileId;
          const pendingLinkHandleTx = getPendingLinkHandleTxFor(profileId);
          const pendingUnlinkHandleTx = getPendingUnlinkHandleTxFor(profileId);

          if (pendingLinkHandleTx) {
            return buildHandleInfo({
              profileId,
              fullHandle: pendingLinkHandleTx.request.fullHandle,
            });
          }
          if (pendingUnlinkHandleTx) {
            return undefined;
          }

          return existing;
        },
      },
    },
  };
}
