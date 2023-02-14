import { ApolloCache, makeVar, NormalizedCacheObject, ReactiveVar } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { DocumentNode, ExecutionResult, GraphQLError } from 'graphql';

import { LensApolloClient } from '../LensApolloClient';
import { createApolloCache } from '../createApolloCache';
import { ApolloServerErrorCode } from '../isGraphQLValidationError';
import { PendingTransactionState, TxStatus } from '../transactions';

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
): LensApolloClient<NormalizedCacheObject> {
  return new LensApolloClient({
    cache: createMockApolloCache(cacheConfiguration),

    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),

    pollingInterval: 1, // FAST
  });
}

export function createGraphQLError({
  code,
  message = 'No pings please!',
}: {
  code: string;
  message: string;
}): GraphQLError {
  return new GraphQLError(message, undefined, undefined, undefined, undefined, undefined, { code });
}

export function createGraphQLValidationError(message = 'No pings please!'): GraphQLError {
  return createGraphQLError({
    message,
    code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
  });
}

export function createValidationErrorMockedResponse(
  document: DocumentNode,
): MockedResponse<unknown> {
  return {
    request: {
      query: document,
    },
    result: {
      errors: [createGraphQLValidationError()],
    },
  };
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
          code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
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

export function mockPendingTransactionState<T extends SupportedTransactionRequest>(
  partial: Partial<PendingTransactionState<T>>,
): PendingTransactionState<T> {
  return {
    id: faker.datatype.uuid(),
    status: TxStatus.BROADCASTING,
    request: mockCreatePostRequest() as T,
    ...partial,
  };
}
