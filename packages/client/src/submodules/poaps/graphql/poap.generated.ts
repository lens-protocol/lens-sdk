// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  NetworkAddressFragment,
  AmountFragment,
  Erc20Fragment,
  PaginatedResultInfoFragment,
  ImageFragment,
  ProfileFragment,
  PostFragment,
  QuoteFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  CreateActOnOpenActionEip712TypedDataFragment,
  RelayErrorFragment,
  CreateMomokaPublicationResultFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  NetworkAddressFragmentDoc,
  AmountFragmentDoc,
  Erc20FragmentDoc,
  PaginatedResultInfoFragmentDoc,
  ImageFragmentDoc,
  ProfileFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  OpenActionResultFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  CreateActOnOpenActionEip712TypedDataFragmentDoc,
  RelayErrorFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type PoapEventFragment = {
  id: string;
  fancyId: string | null;
  name: string | null;
  eventUrl: string | null;
  imageUrl: string | null;
  country: string | null;
  city: string | null;
  description: string | null;
  year: number | null;
  startDate: string | null;
  endDate: string | null;
  expiryDate: string | null;
  virtualEvent: boolean | null;
  fromAdmin: boolean | null;
  animationUrl: string | null;
  eventTemplateId: number | null;
  privateEvent: boolean | null;
};

export type PoapTokenFragment = {
  tokenId: string;
  eventId: string;
  layer: Types.PoapTokenLayerType;
  created: string;
  migrated: string | null;
  owner: NetworkAddressFragment;
  event: PoapEventFragment;
};

export type PoapsQueryVariables = Types.Exact<{
  request: Types.UserPoapsQueryRequest;
}>;

export type PoapsQuery = {
  result: { items: Array<PoapTokenFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type MutualPoapsQueryVariables = Types.Exact<{
  request: Types.MutualPoapsQueryRequest;
}>;

export type MutualPoapsQuery = {
  result: { items: Array<PoapEventFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type PoapHoldersQueryVariables = Types.Exact<{
  request: Types.PoapHoldersQueryRequest;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type PoapHoldersQuery = {
  result: { items: Array<ProfileFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type PoapEventQueryVariables = Types.Exact<{
  request: Types.PoapEventQueryRequest;
}>;

export type PoapEventQuery = { result: PoapEventFragment | null };

export const PoapEventFragmentDoc = gql`
  fragment PoapEvent on PoapEvent {
    id
    fancyId
    name
    eventUrl
    imageUrl
    country
    city
    description
    year
    startDate
    endDate
    expiryDate
    virtualEvent
    fromAdmin
    animationUrl
    eventTemplateId
    privateEvent
  }
`;
export const PoapTokenFragmentDoc = gql`
  fragment PoapToken on PoapToken {
    tokenId
    eventId
    owner {
      ...NetworkAddress
    }
    layer
    created
    migrated
    event {
      ...PoapEvent
    }
  }
  ${NetworkAddressFragmentDoc}
  ${PoapEventFragmentDoc}
`;
export const PoapsDocument = gql`
  query Poaps($request: UserPoapsQueryRequest!) {
    result: poaps(request: $request) {
      items {
        ...PoapToken
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PoapTokenFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const MutualPoapsDocument = gql`
  query MutualPoaps($request: MutualPoapsQueryRequest!) {
    result: mutualPoaps(request: $request) {
      items {
        ...PoapEvent
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PoapEventFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const PoapHoldersDocument = gql`
  query PoapHolders(
    $request: PoapHoldersQueryRequest!
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    result: poapHolders(request: $request) {
      items {
        ...Profile
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${ProfileFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const PoapEventDocument = gql`
  query PoapEvent($request: PoapEventQueryRequest!) {
    result: poapEvent(request: $request) {
      ...PoapEvent
    }
  }
  ${PoapEventFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PoapsDocumentString = print(PoapsDocument);
const MutualPoapsDocumentString = print(MutualPoapsDocument);
const PoapHoldersDocumentString = print(PoapHoldersDocument);
const PoapEventDocumentString = print(PoapEventDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Poaps(
      variables: PoapsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PoapsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PoapsQuery>(PoapsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Poaps',
        'query',
      );
    },
    MutualPoaps(
      variables: MutualPoapsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MutualPoapsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MutualPoapsQuery>(MutualPoapsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MutualPoaps',
        'query',
      );
    },
    PoapHolders(
      variables: PoapHoldersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PoapHoldersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PoapHoldersQuery>(PoapHoldersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PoapHolders',
        'query',
      );
    },
    PoapEvent(
      variables: PoapEventQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: PoapEventQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PoapEventQuery>(PoapEventDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PoapEvent',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
