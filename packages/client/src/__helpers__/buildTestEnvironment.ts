import * as GatedEnvironments from '@lens-protocol/gated-content/environments';
import { invariant } from '@lens-protocol/shared-kernel';
import * as dotenv from 'dotenv';

import { Environment } from '../environments';

dotenv.config();

export const buildTestEnvironment = (): Environment => {
  invariant(process.env.TESTING_ENV_URL, 'TESTING_ENV_URL is not defined in .env file');

  return new Environment('testing', process.env.TESTING_ENV_URL, GatedEnvironments.testing);
};
