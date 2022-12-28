import { PublicationSortCriteria } from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';
import { providers, Signer } from 'ethers';

import { RequiredSigner } from './wallet/adapters/ConcreteWallet';

export function isRequiredSigner(signer: Signer): signer is RequiredSigner {
  return '_signTypedData' in signer && signer.provider instanceof providers.JsonRpcProvider;
}

export function assertRequiredSigner(signer: Signer): asserts signer is RequiredSigner {
  invariant(
    isRequiredSigner(signer),
    'The provided signer is not supported. Make sure the Signer implements TypedDataSigner and is connected to a JsonRpcProvider.',
  );
}

export const DEFAULT_PAGINATED_QUERY_LIMIT = 10;

export const DEFAULT_PUBLICATION_SORT_CRITERIA = PublicationSortCriteria.Latest;
