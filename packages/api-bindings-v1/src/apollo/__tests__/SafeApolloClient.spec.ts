// eslint-disable-next-line no-restricted-imports
import { createHttpLink, gql, InMemoryCache, Observable } from '@apollo/client';
import { mockSingleLink } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { SafeApolloClient } from '../SafeApolloClient';
import {
  mockValidationErrorResponse,
  mockGenericErrorResponse,
  mockGenericSuccessResponse,
  createUnauthenticatedHttpResponse,
} from '../__helpers__/mocks';
import { UnspecifiedError, ValidationError } from '../errors';

const query = gql`
  query Ping {
    ping
  }
`;

function observableToPromise<R>(observable: Observable<R>): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    const subscription = observable.subscribe({
      next: (data) => {
        subscription.unsubscribe();
        resolve(data);
      },
      error: reject,
    });
  });
}

describe(`Given an instance of the ${SafeApolloClient.name}`, () => {
  describe(`when invoking the "${SafeApolloClient.prototype.query.name}" method`, () => {
    it(`should throw a ${ValidationError.name} in case of ${GraphQLError.name} with GRAPHQL_VALIDATION_FAILED code`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(mockValidationErrorResponse(query)).setOnError((error) => {
          throw error;
        }),
      });

      return expect(() => client.query({ query })).rejects.toThrow(ValidationError);
    });

    it(`should throw an ${UnspecifiedError.name} in case of ${GraphQLError.name}`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(mockGenericErrorResponse(query)).setOnError((error) => {
          throw error;
        }),
      });

      return expect(() => client.query({ query })).rejects.toThrow(UnspecifiedError);
    });

    it(`should throw an ${UnspecifiedError.name} in case of ServerError (a specific type of NetworkError)`, async () => {
      const fetch = jest.fn().mockResolvedValue(createUnauthenticatedHttpResponse());
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: createHttpLink({
          fetch,
          uri: 'http://localhost:4000/graphql',
        }),
      });

      return expect(() => client.query({ query })).rejects.toThrow(UnspecifiedError);
    });
  });

  describe(`when invoking the "${SafeApolloClient.prototype.mutate.name}" method`, () => {
    const mutation = gql`
      mutation Ping {
        ping
      }
    `;

    it(`should throw a ${ValidationError.name} in case of ${GraphQLError.name} with GRAPHQL_VALIDATION_FAILED code`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(mockValidationErrorResponse(mutation)).setOnError((error) => {
          throw error;
        }),
      });

      return expect(() => client.mutate({ mutation })).rejects.toThrow(ValidationError);
    });

    it(`should throw an ${UnspecifiedError.name} in case of ${GraphQLError.name}`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(mockGenericErrorResponse(mutation)).setOnError((error) => {
          throw error;
        }),
      });

      return expect(() => client.mutate({ mutation })).rejects.toThrow(UnspecifiedError);
    });

    it(`should throw an ${UnspecifiedError.name} in case of ServerError (a specific type of NetworkError)`, async () => {
      const fetch = jest.fn().mockResolvedValue(createUnauthenticatedHttpResponse());
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: createHttpLink({
          fetch,
          uri: 'http://localhost:4000/graphql',
        }),
      });

      return expect(() => client.mutate({ mutation })).rejects.toThrow(UnspecifiedError);
    });
  });

  describe(`when invoking the "${SafeApolloClient.prototype.poll.name}" method`, () => {
    it(`should emit the fetched data`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(
          mockGenericSuccessResponse(query, { ping: false }),
          mockGenericSuccessResponse(query, { ping: true }),
        ).setOnError((error) => {
          throw error;
        }),
      });

      const observable = client.poll({ query });

      return expect(observableToPromise(observable)).resolves.toMatchObject({
        ping: expect.any(Boolean),
      });
    });

    it(`should emit a ${ValidationError.name} in case of ${GraphQLError.name} with GRAPHQL_VALIDATION_FAILED code`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(mockValidationErrorResponse(query)).setOnError((error) => {
          throw error;
        }),
      });

      const observable = client.poll({ query });

      return expect(observableToPromise(observable)).rejects.toThrow(ValidationError);
    });

    it(`should emit an ${UnspecifiedError.name} in case of ${GraphQLError.name}`, async () => {
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: mockSingleLink(mockGenericErrorResponse(query)).setOnError((error) => {
          throw error;
        }),
      });

      const observable = client.poll({ query });

      return expect(observableToPromise(observable)).rejects.toThrow(UnspecifiedError);
    });

    it(`should emit an ${UnspecifiedError.name} in case of ServerError (a specific type of NetworkError)`, async () => {
      const fetch = jest.fn().mockResolvedValue(createUnauthenticatedHttpResponse());
      const client = new SafeApolloClient({
        cache: new InMemoryCache(),

        link: createHttpLink({
          fetch,
          uri: 'http://localhost:4000/graphql',
        }),
      });

      const observable = client.poll({ query });

      return expect(observableToPromise(observable)).rejects.toThrow(UnspecifiedError);
    });
  });
});
