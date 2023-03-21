import { NormalizedCacheObject } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { DocumentNode, ExecutionResult, GraphQLError } from 'graphql';

import { LensApolloClient } from '../LensApolloClient';
import { createMockApolloCache, MockCacheConfiguration } from '../cache/__helpers__/mocks';
import { ApolloServerErrorCode } from '../isGraphQLValidationError';

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
