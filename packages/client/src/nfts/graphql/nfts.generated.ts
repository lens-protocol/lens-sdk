// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  CommonPaginatedResultInfoFragment,
  Erc20AmountFragment,
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  WalletFragment,
  Eip712TypedDataDomainFragment,
  RelayerResultFragment,
  RelayErrorFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  CommonPaginatedResultInfoFragmentDoc,
  Erc20AmountFragmentDoc,
  PostFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  WalletFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
} from '../../graphql/fragments.generated';
export type NftFragment = {
  __typename: 'NFT';
  contractName: string;
  contractAddress: string;
  symbol: string;
  tokenId: string;
  name: string;
  description: string;
  contentURI: string;
  chainId: number;
  collectionName: string;
  ercType: string;
  owners: Array<{ amount: number; address: string }>;
  originalContent: { uri: string; animatedUrl: string | null; metaType: string };
};

export type NftGalleryFragment = {
  id: string;
  name: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  items: Array<NftFragment>;
};

export type NftsQueryVariables = Types.Exact<{
  request: Types.NfTsRequest;
}>;

export type NftsQuery = {
  result: { items: Array<NftFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type NftOwnershipChallengeQueryVariables = Types.Exact<{
  request: Types.NftOwnershipChallengeRequest;
}>;

export type NftOwnershipChallengeQuery = { result: { id: string; text: string; timeout: string } };

export type ProfileGalleriesQueryVariables = Types.Exact<{
  request: Types.NftGalleriesRequest;
}>;

export type ProfileGalleriesQuery = { result: Array<NftGalleryFragment> };

export type CreateNftGalleryMutationVariables = Types.Exact<{
  request: Types.NftGalleryCreateRequest;
}>;

export type CreateNftGalleryMutation = { result: string };

export type UpdateNftGalleryInfoMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateInfoRequest;
}>;

export type UpdateNftGalleryInfoMutation = { updateNftGalleryInfo: void | null };

export type UpdateNftGalleryOrderMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateItemOrderRequest;
}>;

export type UpdateNftGalleryOrderMutation = { updateNftGalleryOrder: void | null };

export type UpdateNftGalleryItemsMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateItemsRequest;
}>;

export type UpdateNftGalleryItemsMutation = { updateNftGalleryItems: void | null };

export type DeleteNftGalleryMutationVariables = Types.Exact<{
  request: Types.NftGalleryDeleteRequest;
}>;

export type DeleteNftGalleryMutation = { deleteNftGallery: void | null };

export const NftFragmentDoc = gql`
  fragment Nft on NFT {
    __typename
    contractName
    contractAddress
    symbol
    tokenId
    owners {
      amount
      address
    }
    name
    description
    contentURI
    originalContent {
      uri
      animatedUrl
      metaType
    }
    chainId
    collectionName
    ercType
  }
`;
export const NftGalleryFragmentDoc = gql`
  fragment NftGallery on NftGallery {
    id
    name
    profileId
    createdAt
    updatedAt
    items {
      ...Nft
    }
  }
  ${NftFragmentDoc}
`;
export const NftsDocument = gql`
  query Nfts($request: NFTsRequest!) {
    result: nfts(request: $request) {
      items {
        ...Nft
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${NftFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const NftOwnershipChallengeDocument = gql`
  query NftOwnershipChallenge($request: NftOwnershipChallengeRequest!) {
    result: nftOwnershipChallenge(request: $request) {
      id
      text
      timeout
    }
  }
`;
export const ProfileGalleriesDocument = gql`
  query ProfileGalleries($request: NftGalleriesRequest!) {
    result: nftGalleries(request: $request) {
      ...NftGallery
    }
  }
  ${NftGalleryFragmentDoc}
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
const NftOwnershipChallengeDocumentString = print(NftOwnershipChallengeDocument);
const ProfileGalleriesDocumentString = print(ProfileGalleriesDocument);
const CreateNftGalleryDocumentString = print(CreateNftGalleryDocument);
const UpdateNftGalleryInfoDocumentString = print(UpdateNftGalleryInfoDocument);
const UpdateNftGalleryOrderDocumentString = print(UpdateNftGalleryOrderDocument);
const UpdateNftGalleryItemsDocumentString = print(UpdateNftGalleryItemsDocument);
const DeleteNftGalleryDocumentString = print(DeleteNftGalleryDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Nfts(
      variables: NftsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
    NftOwnershipChallenge(
      variables: NftOwnershipChallengeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: NftOwnershipChallengeQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<NftOwnershipChallengeQuery>(
            NftOwnershipChallengeDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'NftOwnershipChallenge',
        'query',
      );
    },
    ProfileGalleries(
      variables: ProfileGalleriesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
    CreateNFTGallery(
      variables: CreateNftGalleryMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
      requestHeaders?: Dom.RequestInit['headers'],
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
