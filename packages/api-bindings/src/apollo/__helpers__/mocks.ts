import { NormalizedCacheObject } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { DocumentNode, ExecutionResult, GraphQLError } from 'graphql';

import { SafeApolloClient } from '../SafeApolloClient';
import { createLensCache } from '../cache';
import { ApolloServerErrorCode } from '../errors';

export function mockLensApolloClient(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks: ReadonlyArray<MockedResponse<any, any>> = [],
): SafeApolloClient<NormalizedCacheObject> {
  return new SafeApolloClient({
    cache: createLensCache(),

    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),

    pollingInterval: 1, // FAST
  });
}

function createGraphQLError({
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

function createValidationGraphQLError(message = 'No pings please!'): GraphQLError {
  // why GraphQLError and not ApolloError? Cause GraphQLError responses are rehydrated by ApolloClient
  // into ApolloError instances, and this dummy error is used to test the error logic of SafeApolloClient
  // which has a proper HttpLink instance (instead of mockSingleLink) that will rehydrate the error.
  return createGraphQLError({
    message,
    code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
  });
}

export function mockValidationErrorResponse(document: DocumentNode): MockedResponse<unknown> {
  return {
    request: {
      query: document,
    },
    result: {
      errors: [createValidationGraphQLError()],
    },
  };
}

export function mockGenericSuccessResponse<T>(document: DocumentNode, data: T): MockedResponse<T> {
  return {
    request: {
      query: document,
    },
    result: { data },
  };
}

export function mockGenericErrorResponse(document: DocumentNode): MockedResponse<unknown> {
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
