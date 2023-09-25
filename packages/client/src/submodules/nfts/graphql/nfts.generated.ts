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
export type OwnerFragment = { __typename: 'Owner'; amount: string; address: string };

export type NftCollectionFragment = {
  __typename: 'NftCollection';
  name: string;
  symbol: string;
  baseUri: string | null;
  contractType: Types.NftContractType;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
};

export type NftMetadataFragment = {
  __typename: 'NftMetadata';
  name: string | null;
  description: string | null;
  image: {
    __typename: 'ImageSet';
    raw: { __typename: 'Image' } & ImageFragment;
    optimized: ({ __typename: 'Image' } & ImageFragment) | null;
  } | null;
};

export type NftFragment = {
  __typename: 'Nft';
  tokenId: string;
  contentURI: string;
  contractType: Types.NftContractType;
  owner: { __typename: 'Owner' } & OwnerFragment;
  contract: { __typename: 'NetworkAddress' } & NetworkAddressFragment;
  collection: { __typename: 'NftCollection' } & NftCollectionFragment;
  metadata: { __typename: 'NftMetadata' } & NftMetadataFragment;
};

export type NftGalleryFragment = {
  __typename: 'NftGallery';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{ __typename: 'Nft' } & NftFragment>;
};

export type PaginatedNftGalleriesResultFragment = {
  __typename: 'PaginatedNftGalleriesResult';
  items: Array<{ __typename: 'NftGallery' } & NftGalleryFragment>;
  pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
};

export type NftOwnershipChallengeResultFragment = {
  __typename: 'NftOwnershipChallengeResult';
  success: boolean;
  info: string | null;
};

export type NftsQueryVariables = Types.Exact<{
  request: Types.NftsRequest;
}>;

export type NftsQuery = {
  __typename: 'Query';
  result: {
    __typename: 'PaginatedNftsResult';
    items: Array<{ __typename: 'Nft' } & NftFragment>;
    pageInfo: { __typename: 'PaginatedResultInfo' } & PaginatedResultInfoFragment;
  };
};

export type ProfileGalleriesQueryVariables = Types.Exact<{
  request: Types.NftGalleriesRequest;
}>;

export type ProfileGalleriesQuery = {
  __typename: 'Query';
  result: { __typename: 'PaginatedNftGalleriesResult' } & PaginatedNftGalleriesResultFragment;
};

export type NftOwnershipChallengeMutationVariables = Types.Exact<{
  request: Types.NftOwnershipChallengeRequest;
}>;

export type NftOwnershipChallengeMutation = {
  __typename: 'Mutation';
  result: { __typename: 'NftOwnershipChallengeResult' } & NftOwnershipChallengeResultFragment;
};

export type CreateNftGalleryMutationVariables = Types.Exact<{
  request: Types.NftGalleryCreateRequest;
}>;

export type CreateNftGalleryMutation = { __typename: 'Mutation'; result: string };

export type UpdateNftGalleryInfoMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateInfoRequest;
}>;

export type UpdateNftGalleryInfoMutation = {
  __typename: 'Mutation';
  updateNftGalleryInfo: string | null;
};

export type UpdateNftGalleryOrderMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateItemOrderRequest;
}>;

export type UpdateNftGalleryOrderMutation = {
  __typename: 'Mutation';
  updateNftGalleryOrder: string | null;
};

export type UpdateNftGalleryItemsMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateItemsRequest;
}>;

export type UpdateNftGalleryItemsMutation = {
  __typename: 'Mutation';
  updateNftGalleryItems: string | null;
};

export type DeleteNftGalleryMutationVariables = Types.Exact<{
  request: Types.NftGalleryDeleteRequest;
}>;

export type DeleteNftGalleryMutation = { __typename: 'Mutation'; deleteNftGallery: string | null };

export const OwnerFragmentDoc = gql`
  fragment Owner on Owner {
    amount
    address
  }
`;
export const NftCollectionFragmentDoc = gql`
  fragment NftCollection on NftCollection {
    contract {
      ...NetworkAddress
    }
    name
    symbol
    baseUri
    contractType
  }
  ${NetworkAddressFragmentDoc}
`;
export const NftMetadataFragmentDoc = gql`
  fragment NftMetadata on NftMetadata {
    name
    description
    image {
      raw {
        ...Image
      }
      optimized {
        ...Image
      }
    }
  }
  ${ImageFragmentDoc}
`;
export const NftFragmentDoc = gql`
  fragment Nft on Nft {
    tokenId
    owner {
      ...Owner
    }
    contentURI
    contract {
      ...NetworkAddress
    }
    contractType
    collection {
      ...NftCollection
    }
    metadata {
      ...NftMetadata
    }
  }
  ${OwnerFragmentDoc}
  ${NetworkAddressFragmentDoc}
  ${NftCollectionFragmentDoc}
  ${NftMetadataFragmentDoc}
`;
export const NftGalleryFragmentDoc = gql`
  fragment NftGallery on NftGallery {
    id
    name
    createdAt
    updatedAt
    items {
      ...Nft
    }
  }
  ${NftFragmentDoc}
`;
export const PaginatedNftGalleriesResultFragmentDoc = gql`
  fragment PaginatedNftGalleriesResult on PaginatedNftGalleriesResult {
    items {
      ...NftGallery
    }
    pageInfo {
      ...PaginatedResultInfo
    }
  }
  ${NftGalleryFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const NftOwnershipChallengeResultFragmentDoc = gql`
  fragment NftOwnershipChallengeResult on NftOwnershipChallengeResult {
    success
    info
  }
`;
export const NftsDocument = gql`
  query Nfts($request: NftsRequest!) {
    result: nfts(request: $request) {
      items {
        ...Nft
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${NftFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const ProfileGalleriesDocument = gql`
  query ProfileGalleries($request: NftGalleriesRequest!) {
    result: nftGalleries(request: $request) {
      ...PaginatedNftGalleriesResult
    }
  }
  ${PaginatedNftGalleriesResultFragmentDoc}
`;
export const NftOwnershipChallengeDocument = gql`
  mutation NftOwnershipChallenge($request: NftOwnershipChallengeRequest!) {
    result: nftOwnershipChallenge(request: $request) {
      ...NftOwnershipChallengeResult
    }
  }
  ${NftOwnershipChallengeResultFragmentDoc}
`;
export const CreateNftGalleryDocument = gql`
  mutation CreateNFTGallery($request: NftGalleryCreateRequest!) {
    result: createNftGallery(request: $request)
  }
`;
export const UpdateNftGalleryInfoDocument = gql`
  mutation UpdateNFTGalleryInfo($request: NftGalleryUpdateInfoRequest!) {
    updateNftGalleryInfo(request: $request)
  }
`;
export const UpdateNftGalleryOrderDocument = gql`
  mutation UpdateNFTGalleryOrder($request: NftGalleryUpdateItemOrderRequest!) {
    updateNftGalleryOrder(request: $request)
  }
`;
export const UpdateNftGalleryItemsDocument = gql`
  mutation UpdateNFTGalleryItems($request: NftGalleryUpdateItemsRequest!) {
    updateNftGalleryItems(request: $request)
  }
`;
export const DeleteNftGalleryDocument = gql`
  mutation DeleteNFTGallery($request: NftGalleryDeleteRequest!) {
    deleteNftGallery(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const NftsDocumentString = print(NftsDocument);
const ProfileGalleriesDocumentString = print(ProfileGalleriesDocument);
const NftOwnershipChallengeDocumentString = print(NftOwnershipChallengeDocument);
const CreateNftGalleryDocumentString = print(CreateNftGalleryDocument);
const UpdateNftGalleryInfoDocumentString = print(UpdateNftGalleryInfoDocument);
const UpdateNftGalleryOrderDocumentString = print(UpdateNftGalleryOrderDocument);
const UpdateNftGalleryItemsDocumentString = print(UpdateNftGalleryItemsDocument);
const DeleteNftGalleryDocumentString = print(DeleteNftGalleryDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Nfts(
      variables: NftsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: NftsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<NftsQuery>(NftsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Nfts',
        'query',
      );
    },
    ProfileGalleries(
      variables: ProfileGalleriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ProfileGalleriesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileGalleriesQuery>(ProfileGalleriesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ProfileGalleries',
        'query',
      );
    },
    NftOwnershipChallenge(
      variables: NftOwnershipChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: NftOwnershipChallengeMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<NftOwnershipChallengeMutation>(
            NftOwnershipChallengeDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'NftOwnershipChallenge',
        'mutation',
      );
    },
    CreateNFTGallery(
      variables: CreateNftGalleryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateNftGalleryMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateNftGalleryMutation>(CreateNftGalleryDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateNFTGallery',
        'mutation',
      );
    },
    UpdateNFTGalleryInfo(
      variables: UpdateNftGalleryInfoMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UpdateNftGalleryInfoMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdateNftGalleryInfoMutation>(
            UpdateNftGalleryInfoDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateNFTGalleryInfo',
        'mutation',
      );
    },
    UpdateNFTGalleryOrder(
      variables: UpdateNftGalleryOrderMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UpdateNftGalleryOrderMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdateNftGalleryOrderMutation>(
            UpdateNftGalleryOrderDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateNFTGalleryOrder',
        'mutation',
      );
    },
    UpdateNFTGalleryItems(
      variables: UpdateNftGalleryItemsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UpdateNftGalleryItemsMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdateNftGalleryItemsMutation>(
            UpdateNftGalleryItemsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateNFTGalleryItems',
        'mutation',
      );
    },
    DeleteNFTGallery(
      variables: DeleteNftGalleryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: DeleteNftGalleryMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<DeleteNftGalleryMutation>(DeleteNftGalleryDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteNFTGallery',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
