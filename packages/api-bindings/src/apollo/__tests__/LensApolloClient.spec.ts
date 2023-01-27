import { gql, HttpLink, InMemoryCache, toPromise } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { DocumentNode, GraphQLError } from 'graphql';

import { LensApolloClient } from '../LensApolloClient';
import { UnspecifiedError } from '../UnspecifiedError';
import {
  createGenericErrorMockedResponse,
  createUnauthenticatedResponse,
} from '../__helpers__/mocks';

const query = gql`
  query Ping {
    ping
  }
`;

function createGenericSuccessMockedResponse<T>(document: DocumentNode, data: T): MockedResponse<T> {
  return {
    request: {
      query: document,
    },
    result: { data },
  };
}

describe(`Given an instance of the ${LensApolloClient.name}`, () => {
  describe(`when invoking the "${LensApolloClient.prototype.query.name}" method`, () => {
    it(`should throw an ${UnspecifiedError.name} in case of ${GraphQLError.name}`, async () => {
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(createGenericErrorMockedResponse(query)).setOnError((error) => {
          throw error;
        }),
      });

      return expect(() => client.query({ query })).rejects.toThrow(UnspecifiedError);
    });

    it(`should throw an ${UnspecifiedError.name} in case of ServerError (a specific type of NetworkError)`, async () => {
      const fetch = jest.fn().mockResolvedValue(createUnauthenticatedResponse());
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: new HttpLink({
          uri: 'http://localhost:4000/graphql',
          fetch,
        }),
      });

      return expect(() => client.query({ query })).rejects.toThrow(UnspecifiedError);
    });
  });

  describe(`when invoking the "${LensApolloClient.prototype.mutate.name}" method`, () => {
    const mutation = gql`
      mutation Ping {
        ping
      }
    `;

    it(`should throw an ${UnspecifiedError.name} in case of ${GraphQLError.name}`, async () => {
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(createGenericErrorMockedResponse(mutation)).setOnError((error) => {
          throw error;
        }),
      });

      return expect(() => client.mutate({ mutation })).rejects.toThrow(UnspecifiedError);
    });

    it(`should throw an ${UnspecifiedError.name} in case of ServerError (a specific type of NetworkError)`, async () => {
      const fetch = jest.fn().mockResolvedValue(createUnauthenticatedResponse());
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: new HttpLink({
          uri: 'http://localhost:4000/graphql',
          fetch,
        }),
      });

      return expect(() => client.mutate({ mutation })).rejects.toThrow(UnspecifiedError);
    });
  });

  describe(`when invoking the "${LensApolloClient.prototype.poll.name}" method`, () => {
    it(`should emit the fetched data`, async () => {
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(
          createGenericSuccessMockedResponse(query, { ping: false }),
          createGenericSuccessMockedResponse(query, { ping: true }),
        ).setOnError((error) => {
          throw error;
        }),
      });

      const observable = client.poll({ query });

      return expect(toPromise(observable)).resolves.toMatchObject({ ping: expect.any(Boolean) });
    });

    it(`should emit an ${UnspecifiedError.name} in case of ${GraphQLError.name}`, async () => {
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(createGenericErrorMockedResponse(query)).setOnError((error) => {
          throw error;
        }),
      });

      const observable = client.poll({ query });

      return expect(toPromise(observable)).rejects.toThrow(UnspecifiedError);
    });

    it(`should emit an ${UnspecifiedError.name} in case of ServerError (a specific type of NetworkError)`, async () => {
      const fetch = jest.fn().mockResolvedValue(createUnauthenticatedResponse());
      const client = new LensApolloClient({
        cache: new InMemoryCache(),

        link: new HttpLink({
          uri: 'http://localhost:4000/graphql',
          fetch,
        }),
      });

      const observable = client.poll({ query });

      return expect(toPromise(observable)).rejects.toThrow(UnspecifiedError);
    });
  });
});
