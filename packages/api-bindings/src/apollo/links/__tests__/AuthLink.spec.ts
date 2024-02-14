import {
  ApolloClient,
  ApolloError,
  // eslint-disable-next-line no-restricted-imports
  createHttpLink,
  from,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { createHttpJsonResponse, createUnauthenticatedHttpResponse } from '../../__helpers__/mocks';
import { ApolloServerErrorCode } from '../../errors';
import { createAuthLink, IAccessTokenStorage } from '../AuthLink';

const query = gql`
  query Loopback($value: Float!) {
    loopback(value: $value)
  }
`;

const accessTokenStorage = mock<IAccessTokenStorage>();

function mockLoopbackResponse() {
  const value = Math.random() * 100;
  return {
    request: {
      query,
      variables: { value },
    },
    result: {
      data: {
        loopback: value,
      },
    },
  };
}

function setupTestScenario(mocks: ReadonlyArray<Response>) {
  const fetch = jest.fn();

  mocks.forEach((mock) => {
    fetch.mockResolvedValueOnce(mock);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      createAuthLink({ accessTokenStorage }),
      createHttpLink({
        fetch,
        uri: 'http://localhost:4000/graphql',
      }),
    ]),
  });
}

describe(`Given an instance of the ${ApolloClient.name}`, () => {
  describe('wired with AuthLink', () => {
    describe(`and a response is a GraphQL error with code=${ApolloServerErrorCode.UNAUTHENTICATED}`, () => {
      const mockedResponse = mockLoopbackResponse();

      describe(`when the token refresh succeeds`, () => {
        beforeEach(() => {
          accessTokenStorage.refreshToken.mockImplementationOnce(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1));
            return success();
          });
        });

        it(`should refresh the access token and retry the request`, async () => {
          const client = setupTestScenario([
            createUnauthenticatedHttpResponse(),
            createHttpJsonResponse(200, mockedResponse.result),
          ]);

          const result = await client.query(mockedResponse.request);

          expect(accessTokenStorage.refreshToken).toHaveBeenCalled();
          expect(result.data).toEqual({ loopback: mockedResponse.request.variables?.value });
        });

        it('should queue any request while refreshing and retry them after the refresh', async () => {
          const queuedResponse = mockLoopbackResponse();
          const client = setupTestScenario([
            createUnauthenticatedHttpResponse(),
            createUnauthenticatedHttpResponse(),
            createHttpJsonResponse(200, mockedResponse.result),
            createHttpJsonResponse(200, queuedResponse.result),
          ]);

          const [firstResult, secondResult] = await Promise.all([
            client.query(mockedResponse.request),
            client.query(queuedResponse.request),
          ]);

          expect(firstResult.data).toEqual({ loopback: mockedResponse.request.variables?.value });
          expect(secondResult.data).toEqual({ loopback: queuedResponse.request.variables?.value });
        });

        it('should propagate the error in case the retry fails', async () => {
          const mockedFailedResponse = createUnauthenticatedHttpResponse();
          const client = setupTestScenario([mockedFailedResponse, mockedFailedResponse]);

          await expect(client.query(mockedResponse.request)).rejects.toThrowError(ApolloError);
        });
      });

      describe(`when the token refresh fails`, () => {
        beforeEach(() => {
          accessTokenStorage.refreshToken.mockImplementationOnce(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1));
            return failure(new CredentialsExpiredError());
          });
        });

        it(`should forward the original error result`, async () => {
          const client = setupTestScenario([createUnauthenticatedHttpResponse()]);

          await expect(client.query(mockedResponse.request)).rejects.toThrowError(ApolloError);
        });

        it(`should let any queued request continue (and possibly fail)`, async () => {
          const queuedResponse = mockLoopbackResponse();
          const client = setupTestScenario([
            createUnauthenticatedHttpResponse(),
            createUnauthenticatedHttpResponse(),
            createUnauthenticatedHttpResponse(),
          ]);

          const firstPromise = client.query(mockedResponse.request);
          const secondPromise = client.query(queuedResponse.request);

          await expect(firstPromise).rejects.toThrow('Authentication required');
          await expect(secondPromise).rejects.toThrow('Authentication required');
        });
      });
    });
  });
});
