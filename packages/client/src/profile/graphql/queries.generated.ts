import * as Types from '../../graphql/types.generated.js';

import { ProfileFragment } from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { ProfileFragmentDoc } from '../../graphql/fragments.generated';
export type ProfileQueryVariables = Types.Exact<{
  request: Types.SingleProfileQueryRequest;
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type ProfileQuery = { result: Types.Maybe<ProfileFragment> };

export type DefaultProfileQueryVariables = Types.Exact<{
  address: Types.Scalars['EthereumAddress'];
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
}>;

export type DefaultProfileQuery = { result: Types.Maybe<ProfileFragment> };

export const ProfileDocument = gql`
  query Profile($request: SingleProfileQueryRequest!, $observerId: ProfileId) {
    result: profile(request: $request) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;
export const DefaultProfileDocument = gql`
  query DefaultProfile($address: EthereumAddress!, $observerId: ProfileId) {
    result: defaultProfile(request: { ethereumAddress: $address }) {
      ...Profile
    }
  }
  ${ProfileFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const ProfileDocumentString = print(ProfileDocument);
const DefaultProfileDocumentString = print(DefaultProfileDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Profile(
      variables: ProfileQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: ProfileQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileQuery>(ProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Profile',
        'query',
      );
    },
    DefaultProfile(
      variables: DefaultProfileQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: DefaultProfileQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<DefaultProfileQuery>(DefaultProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DefaultProfile',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
