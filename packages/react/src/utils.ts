import { invariant } from '@lens-protocol/shared-kernel';
import { Signer } from 'ethers';

import { RequiredSigner } from './wallet/adapters/ConcreteWallet';

export function isRequiredSigner(signer: Signer): signer is RequiredSigner {
  return '_signTypedData' in signer;
}

export function assertRequiredSigner(signer: Signer): asserts signer is RequiredSigner {
  invariant(
    isRequiredSigner(signer),
    'The provided signer is not supported. Make sure the Signer implements TypedDataSigner',
  );
}

export const DEFAULT_PAGINATED_QUERY_LIMIT = 10;
