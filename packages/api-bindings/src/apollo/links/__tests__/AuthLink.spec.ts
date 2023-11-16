import { ApolloClient, ApolloError, from, gql, InMemoryCache } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { mockAuthenticationErrorResponse } from '../../__helpers__/mocks';
import { ApolloServerErrorCode } from '../../errors';
import { createAuthLink, IAccessTokenStorage } from '../AuthLink';

const query = gql`
  query Loopback($value: Float!) {
    loopback(value: $value)
  }
`;
type LoopbackData = { loopback: number };
type LoopbackVariables = { value: number };

const accessTokenStorage = mock<IAccessTokenStorage>();

function mockLoopbackResponse(): MockedResponse<LoopbackData, LoopbackVariables> {
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

function setupTestScenario(mocks: ReadonlyArray<MockedResponse<unknown>>) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      createAuthLink(accessTokenStorage),
      mockSingleLink(...mocks).setOnError((error) => {
        throw error;
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
            mockAuthenticationErrorResponse(mockedResponse.request),
            mockedResponse,
          ]);

          const result = await client.query(mockedResponse.request);

          expect(accessTokenStorage.refreshToken).toHaveBeenCalled();
          expect(result.data).toEqual({ loopback: mockedResponse.request.variables?.value });
        });

        it('should queue any request while refreshing and retry them after the refresh', async () => {
          const queuedResponse = mockLoopbackResponse();
          const client = setupTestScenario([
            mockAuthenticationErrorResponse(mockedResponse.request),
            mockAuthenticationErrorResponse(queuedResponse.request),
            mockedResponse,
            queuedResponse,
          ]);

          const [firstResult, secondResult] = await Promise.all([
            client.query(mockedResponse.request),
            client.query(queuedResponse.request),
          ]);

          expect(firstResult.data).toEqual({ loopback: mockedResponse.request.variables?.value });
          expect(secondResult.data).toEqual({ loopback: queuedResponse.request.variables?.value });
        });

        it('should propagate the error in case the retry fails', async () => {
          const mockedFailedResponse = mockAuthenticationErrorResponse(mockedResponse.request);
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
          const client = setupTestScenario([
            mockAuthenticationErrorResponse(mockedResponse.request),
          ]);

          await expect(client.query(mockedResponse.request)).rejects.toThrowError(ApolloError);
        });

        it(`should let any queued request continue (and possibly fail)`, async () => {
          const queuedResponse = mockLoopbackResponse();
          const client = setupTestScenario([
            mockAuthenticationErrorResponse(mockedResponse.request),
            mockAuthenticationErrorResponse(queuedResponse.request),
            mockAuthenticationErrorResponse(queuedResponse.request),
          ]);

          const firstPromise = client.query(mockedResponse.request);
          const secondPromise = client.query(queuedResponse.request);

          await expect(firstPromise).rejects.toThrowError('Authentication required');
          await expect(secondPromise).rejects.toThrowError('Authentication required');
        });
      });
    });
  });
});
