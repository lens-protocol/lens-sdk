import { invariant } from '@lens-protocol/shared-kernel';
import * as dotenv from 'dotenv';

import { Environment } from '../consts/environments';

dotenv.config();

export const buildTestEnvironment = (): Environment => {
  invariant(process.env.TESTING_ENV_URL, 'TESTING_ENV_URL is not defined in .env file');

  return new Environment('testing', process.env.TESTING_ENV_URL);
};
