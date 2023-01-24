import { invariant } from '@lens-protocol/shared-kernel';
import * as dotenv from 'dotenv';

import { SdkFunctionWrapper } from '../graphql/fragments.generated';

dotenv.config();

export const testHeaderWrapper: SdkFunctionWrapper = async (action) => {
  // add headers only in test env
  if (process.env.NODE_ENV !== 'testing') {
    return action();
  }

  invariant(process.env.TESTING_HEADER_KEY, 'TESTING_HEADER_KEY is not defined in .env file');
  invariant(process.env.TESTING_HEADER_VALUE, 'TESTING_HEADER_VALUE is not defined in .env file');

  return action({
    [process.env.TESTING_HEADER_KEY]: process.env.TESTING_HEADER_VALUE,
  });
};
