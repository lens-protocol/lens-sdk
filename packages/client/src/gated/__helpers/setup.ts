import { Wallet } from 'ethers';

import { buildTestEnvironment } from '../../__helpers__';
import { LensClient } from '../LensClient';

export function createGatedLensClient(signer: Wallet) {
  return new LensClient({
    environment: buildTestEnvironment(),
    authentication: {
      domain: 'lens.dev',
      uri: 'https://lens.dev',
    },
    signer,
  });
}
