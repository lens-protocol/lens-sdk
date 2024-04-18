import { Wallet } from '@ethersproject/wallet';
import { invariant } from '@lens-protocol/shared-kernel';
import * as dotenv from 'dotenv';

import { buildTestEnvironment } from '../../__helpers__';
import { LensClient } from '../LensClient';

dotenv.config();

export function createGatedLensClient(signer: Wallet) {
  invariant(process.env.TESTING_NO_RATE_LIMIT, 'TESTING_NO_RATE_LIMIT is not defined in .env file');
  invariant(process.env.TESTING_WHITELISTED, 'TESTING_WHITELISTED is not defined in .env file');

  return new LensClient({
    environment: buildTestEnvironment(),
    authentication: {
      domain: 'lens.dev',
      uri: 'https://lens.dev',
    },
    headers: {
      'x-e2e-lens-no-rl': process.env.TESTING_NO_RATE_LIMIT,
      'X-Whitelisted': process.env.TESTING_WHITELISTED,
    },
    signer,
  });
}
