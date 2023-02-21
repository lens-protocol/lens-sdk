// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type GlobalProtocolStatsQueryVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.GlobalProtocolStatsRequest>;
}>;

export type GlobalProtocolStatsQuery = {
  result: {
    totalProfiles: number;
    totalBurntProfiles: number;
    totalPosts: number;
    totalMirrors: number;
    totalComments: number;
    totalCollects: number;
    totalFollows: number;
    totalRevenue: Array<{
      value: string;
      asset: { name: string; symbol: string; decimals: number; address: string };
    }>;
  };
};

export const GlobalProtocolStatsDocument = gql`
  query GlobalProtocolStats($request: GlobalProtocolStatsRequest) {
    result: globalProtocolStats(request: $request) {
      totalProfiles
      totalBurntProfiles
      totalPosts
      totalMirrors
      totalComments
      totalCollects
      totalFollows
      totalRevenue {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GlobalProtocolStatsDocumentString = print(GlobalProtocolStatsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GlobalProtocolStats(
      variables?: GlobalProtocolStatsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: GlobalProtocolStatsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GlobalProtocolStatsQuery>(
            GlobalProtocolStatsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GlobalProtocolStats',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
