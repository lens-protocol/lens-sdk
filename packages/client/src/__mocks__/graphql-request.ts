import { invariant } from '@lens-protocol/shared-kernel';
import * as dotenv from 'dotenv';

dotenv.config();

function buildTestHeaders() {
  invariant(process.env.TESTING_HEADER_KEY, 'TESTING_HEADER_KEY is not defined in .env file');
  invariant(process.env.TESTING_HEADER_VALUE, 'TESTING_HEADER_VALUE is not defined in .env file');

  return {
    [process.env.TESTING_HEADER_KEY]: process.env.TESTING_HEADER_VALUE,
  };
}

const actual = jest.requireActual('graphql-request') as unknown;

// eslint-disable-next-line
// @ts-ignore
class MockGraphQLClient extends actual.GraphQLClient {
  constructor(url: string) {
    // eslint-disable-next-line
    super(url, { headers: buildTestHeaders });
  }
}

export const GraphQLClient = MockGraphQLClient;
