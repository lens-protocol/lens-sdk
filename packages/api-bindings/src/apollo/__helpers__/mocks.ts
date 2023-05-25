import { NormalizedCacheObject } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { DocumentNode, ExecutionResult, GraphQLError } from 'graphql';

import { SafeApolloClient } from '../SafeApolloClient';
import { mockLensCache, MockCacheConfiguration } from '../cache/__helpers__/mocks';
import { ApolloServerErrorCode } from '../isGraphQLValidationError';

export function mockLensApolloClient(
  mocks: ReadonlyArray<MockedResponse<unknown>>,
  cacheConfiguration: MockCacheConfiguration = {},
): SafeApolloClient<NormalizedCacheObject> {
  return new SafeApolloClient({
    cache: mockLensCache(cacheConfiguration),

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
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
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

export function createHttpJsonResponse(
  status: number,
  body: ExecutionResult<unknown>,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

export function createUnauthenticatedHttpResponse() {
  return createHttpJsonResponse(401, {
    data: null,
    errors: [
      createGraphQLError({
        message: 'Authentication required',
        code: 'UNAUTHENTICATED',
      }),
    ],
  });
}
