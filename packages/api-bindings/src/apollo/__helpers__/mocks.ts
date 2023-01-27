import {
  ApolloCache,
  ApolloClient,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
} from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { DocumentNode, ExecutionResult, GraphQLError } from 'graphql';

import { createApolloCache } from '../createApolloCache';

type MockCacheConfiguration = {
  activeWalletVar?: ReactiveVar<WalletData | null>;
};

export function createMockApolloCache({
  activeWalletVar = makeVar<WalletData | null>(null),
}: MockCacheConfiguration = {}): ApolloCache<NormalizedCacheObject> {
  return createApolloCache({ activeWalletVar });
}

export function createMockApolloClientWithMultipleResponses(
  mocks: ReadonlyArray<MockedResponse<unknown>>,
  cacheConfiguration: MockCacheConfiguration = {},
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: createMockApolloCache(cacheConfiguration),

    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),
  });
}

export function createGraphQLError({
  code,
  message = 'No pings please!',
}: {
  code: string;
  message: string;
}) {
  return new GraphQLError(message, undefined, undefined, undefined, undefined, undefined, { code });
}

export function createGenericErrorMockedResponse(document: DocumentNode): MockedResponse<unknown> {
  return {
    request: {
      query: document,
    },
    result: {
      errors: [
        createGraphQLError({
          message: 'No pings please!',
          code: 'GRAPHQL_VALIDATION_FAILED',
        }),
      ],
    },
  };
}

function createJSONResponse(status: number, body: ExecutionResult<unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function createUnauthenticatedResponse() {
  return createJSONResponse(401, {
    data: null,
    errors: [
      createGraphQLError({
        message: 'Authentication required',
        code: 'UNAUTHENTICATED',
      }),
    ],
  });
}
