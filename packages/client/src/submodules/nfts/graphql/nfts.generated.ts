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
  Eip712TypedDataFieldFragment,
  Eip712TypedDataDomainFragment,
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
  Eip712TypedDataFieldFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelayErrorFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type OwnerFragment = { amount: string; address: string };

export type NftCollectionFragment = {
  name: string;
  symbol: string;
  baseUri: string | null;
  contractType: Types.NftContractType;
  contract: NetworkAddressFragment;
};

export type NftMetadataFragment = {
  name: string | null;
  description: string | null;
  image: { raw: ImageFragment; optimized: ImageFragment | null } | null;
};

export type NftFragment = {
  tokenId: string;
  contentURI: string;
  contractType: Types.NftContractType;
  owner: OwnerFragment;
  contract: NetworkAddressFragment;
  collection: NftCollectionFragment;
  metadata: NftMetadataFragment;
};

export type NftGalleryFragment = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: Array<NftFragment>;
};

export type PaginatedNftGalleriesResultFragment = {
  items: Array<NftGalleryFragment>;
  pageInfo: PaginatedResultInfoFragment;
};

export type NftOwnershipChallengeResultFragment = { success: boolean; info: string | null };

export type NftsQueryVariables = Types.Exact<{
  request: Types.NftsRequest;
}>;

export type NftsQuery = {
  result: { items: Array<NftFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type ProfileGalleriesQueryVariables = Types.Exact<{
  request: Types.NftGalleriesRequest;
}>;

export type ProfileGalleriesQuery = { result: PaginatedNftGalleriesResultFragment };

export type NftOwnershipChallengeMutationVariables = Types.Exact<{
  request: Types.NftOwnershipChallengeRequest;
}>;

export type NftOwnershipChallengeMutation = { result: NftOwnershipChallengeResultFragment };

export type CreateNftGalleryMutationVariables = Types.Exact<{
  request: Types.NftGalleryCreateRequest;
}>;

export type CreateNftGalleryMutation = { result: string };

export type UpdateNftGalleryInfoMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateInfoRequest;
}>;

export type UpdateNftGalleryInfoMutation = { updateNftGalleryInfo: string | null };

export type UpdateNftGalleryOrderMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateItemOrderRequest;
}>;

export type UpdateNftGalleryOrderMutation = { updateNftGalleryOrder: string | null };

export type UpdateNftGalleryItemsMutationVariables = Types.Exact<{
  request: Types.NftGalleryUpdateItemsRequest;
}>;

export type UpdateNftGalleryItemsMutation = { updateNftGalleryItems: string | null };

export type DeleteNftGalleryMutationVariables = Types.Exact<{
  request: Types.NftGalleryDeleteRequest;
}>;

export type DeleteNftGalleryMutation = { deleteNftGallery: string | null };

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
