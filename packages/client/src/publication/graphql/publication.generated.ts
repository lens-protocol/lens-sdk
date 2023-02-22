// @ts-nocheck
import * as Types from '../../graphql/types.generated';

import {
  PostFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  CommonPaginatedResultInfoFragment,
  WalletFragment,
  Eip712TypedDataDomainFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  FollowingFragment,
  FollowerFragment,
  Erc20AmountFragment,
} from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  CommonPaginatedResultInfoFragmentDoc,
  WalletFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelayerResultFragmentDoc,
  RelayErrorFragmentDoc,
  FollowingFragmentDoc,
  FollowerFragmentDoc,
  Erc20AmountFragmentDoc,
} from '../../graphql/fragments.generated';
export type PublicationQueryVariables = Types.Exact<{
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
  request: Types.PublicationQueryRequest;
}>;

export type PublicationQuery = { result: CommentFragment | MirrorFragment | PostFragment | null };

export type PublicationsQueryVariables = Types.Exact<{
  request: Types.PublicationsQueryRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type PublicationsQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type ValidatePublicationMetadataQueryVariables = Types.Exact<{
  metadata: Types.PublicationMetadataV2Input;
}>;

export type ValidatePublicationMetadataQuery = {
  validatePublicationMetadata: {
    __typename: 'PublicationValidateMetadataResult';
    valid: boolean;
    reason: string | null;
  };
};

export type WhoCollectedPublicationQueryVariables = Types.Exact<{
  request: Types.WhoCollectedPublicationRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type WhoCollectedPublicationQuery = {
  result: { items: Array<WalletFragment>; pageInfo: CommonPaginatedResultInfoFragment };
};

export type ProfilePublicationsForSaleQueryVariables = Types.Exact<{
  request: Types.ProfilePublicationsForSaleRequest;
  observerId?: Types.InputMaybe<Types.Scalars['ProfileId']>;
}>;

export type ProfilePublicationsForSaleQuery = {
  result: {
    items: Array<CommentFragment | PostFragment>;
    pageInfo: CommonPaginatedResultInfoFragment;
  };
};

export type PublicationMetadataStatusQueryVariables = Types.Exact<{
  request: Types.GetPublicationMetadataStatusRequest;
}>;

export type PublicationMetadataStatusQuery = {
  result: {
    __typename: 'PublicationMetadataStatus';
    reason: string | null;
    status: Types.PublicationMetadataStatusType;
  };
};

export type CreatePostTypedDataMutationVariables = Types.Exact<{
  request: Types.CreatePublicPostRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreatePostTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { PostWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomainFragment;
      value: {
        nonce: number;
        deadline: string;
        profileId: string;
        contentURI: string;
        collectModule: string;
        collectModuleInitData: string;
        referenceModule: string;
        referenceModuleInitData: string;
      };
    };
  };
};

export type CreatePostViaDispatcherMutationVariables = Types.Exact<{
  request: Types.CreatePublicPostRequest;
}>;

export type CreatePostViaDispatcherMutation = {
  result: RelayErrorFragment | RelayerResultFragment;
};

export type CreateCommentTypedDataMutationVariables = Types.Exact<{
  request: Types.CreatePublicCommentRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateCommentTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { CommentWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomainFragment;
      value: {
        nonce: number;
        deadline: string;
        profileId: string;
        contentURI: string;
        profileIdPointed: string;
        pubIdPointed: string;
        collectModule: string;
        collectModuleInitData: string;
        referenceModuleData: string;
        referenceModule: string;
        referenceModuleInitData: string;
      };
    };
  };
};

export type CreateCommentViaDispatcherMutationVariables = Types.Exact<{
  request: Types.CreatePublicCommentRequest;
}>;

export type CreateCommentViaDispatcherMutation = {
  result: RelayErrorFragment | RelayerResultFragment;
};

export type CreateMirrorTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateMirrorRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateMirrorTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { MirrorWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomainFragment;
      value: {
        nonce: number;
        deadline: string;
        profileId: string;
        profileIdPointed: string;
        pubIdPointed: string;
        referenceModuleData: string;
        referenceModule: string;
        referenceModuleInitData: string;
      };
    };
  };
};

export type CreateMirrorViaDispatcherMutationVariables = Types.Exact<{
  request: Types.CreateMirrorRequest;
}>;

export type CreateMirrorViaDispatcherMutation = {
  result: RelayErrorFragment | RelayerResultFragment;
};

export type CreateCollectTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateCollectRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateCollectTypedDataMutation = {
  result: {
    id: string;
    expiresAt: string;
    typedData: {
      types: { CollectWithSig: Array<{ name: string; type: string }> };
      domain: Eip712TypedDataDomainFragment;
      value: { nonce: number; deadline: string; profileId: string; pubId: string; data: string };
    };
  };
};

export type HidePublicationMutationVariables = Types.Exact<{
  request: Types.HidePublicationRequest;
}>;

export type HidePublicationMutation = { hidePublication: void | null };

export type CreateAttachMediaDataMutationVariables = Types.Exact<{
  request: Types.PublicMediaRequest;
}>;

export type CreateAttachMediaDataMutation = {
  result: {
    signedUrl: string;
    media: {
      altTag: string | null;
      cover: string | null;
      item: string;
      source: Types.PublicationMediaSource | null;
      type: string | null;
    };
  };
};

export const PublicationDocument = gql`
  query Publication($observerId: ProfileId, $request: PublicationQueryRequest!) {
    result: publication(request: $request) {
      ... on Post {
        ...Post
      }
      ... on Mirror {
        ...Mirror
      }
      ... on Comment {
        ...Comment
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
`;
export const PublicationsDocument = gql`
  query Publications($request: PublicationsQueryRequest!, $observerId: ProfileId) {
    result: publications(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Mirror {
          ...Mirror
        }
        ... on Comment {
          ...Comment
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const ValidatePublicationMetadataDocument = gql`
  query ValidatePublicationMetadata($metadata: PublicationMetadataV2Input!) {
    validatePublicationMetadata(request: { metadatav2: $metadata }) {
      __typename
      valid
      reason
    }
  }
`;
export const WhoCollectedPublicationDocument = gql`
  query WhoCollectedPublication($request: WhoCollectedPublicationRequest!, $observerId: ProfileId) {
    result: whoCollectedPublication(request: $request) {
      items {
        ...Wallet
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${WalletFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const ProfilePublicationsForSaleDocument = gql`
  query ProfilePublicationsForSale(
    $request: ProfilePublicationsForSaleRequest!
    $observerId: ProfileId
  ) {
    result: profilePublicationsForSale(request: $request) {
      items {
        ... on Post {
          ...Post
        }
        ... on Comment {
          ...Comment
        }
      }
      pageInfo {
        ...CommonPaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentFragmentDoc}
  ${CommonPaginatedResultInfoFragmentDoc}
`;
export const PublicationMetadataStatusDocument = gql`
  query PublicationMetadataStatus($request: GetPublicationMetadataStatusRequest!) {
    result: publicationMetadataStatus(request: $request) {
      __typename
      reason
      status
    }
  }
`;
export const CreatePostTypedDataDocument = gql`
  mutation CreatePostTypedData($request: CreatePublicPostRequest!, $options: TypedDataOptions) {
    result: createPostTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          ...EIP712TypedDataDomain
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreatePostViaDispatcherDocument = gql`
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    result: createPostViaDispatcher(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CreateCommentTypedDataDocument = gql`
  mutation CreateCommentTypedData(
    $request: CreatePublicCommentRequest!
    $options: TypedDataOptions
  ) {
    result: createCommentTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
            name
            type
          }
        }
        domain {
          ...EIP712TypedDataDomain
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          profileIdPointed
          pubIdPointed
          collectModule
          collectModuleInitData
          referenceModuleData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateCommentViaDispatcherDocument = gql`
  mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {
    result: createCommentViaDispatcher(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CreateMirrorTypedDataDocument = gql`
  mutation CreateMirrorTypedData($request: CreateMirrorRequest!, $options: TypedDataOptions) {
    result: createMirrorTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
            name
            type
          }
        }
        domain {
          ...EIP712TypedDataDomain
        }
        value {
          nonce
          deadline
          profileId
          profileIdPointed
          pubIdPointed
          referenceModuleData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateMirrorViaDispatcherDocument = gql`
  mutation CreateMirrorViaDispatcher($request: CreateMirrorRequest!) {
    result: createMirrorViaDispatcher(request: $request) {
      ... on RelayerResult {
        ...RelayerResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${RelayerResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CreateCollectTypedDataDocument = gql`
  mutation CreateCollectTypedData($request: CreateCollectRequest!, $options: TypedDataOptions) {
    result: createCollectTypedData(request: $request, options: $options) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
            name
            type
          }
        }
        domain {
          ...EIP712TypedDataDomain
        }
        value {
          nonce
          deadline
          profileId
          pubId
          data
        }
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const HidePublicationDocument = gql`
  mutation HidePublication($request: HidePublicationRequest!) {
    hidePublication(request: $request)
  }
`;
export const CreateAttachMediaDataDocument = gql`
  mutation CreateAttachMediaData($request: PublicMediaRequest!) {
    result: createAttachMediaData(request: $request) {
      media {
        altTag
        cover
        item
        source
        type
      }
      signedUrl
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PublicationDocumentString = print(PublicationDocument);
const PublicationsDocumentString = print(PublicationsDocument);
const ValidatePublicationMetadataDocumentString = print(ValidatePublicationMetadataDocument);
const WhoCollectedPublicationDocumentString = print(WhoCollectedPublicationDocument);
const ProfilePublicationsForSaleDocumentString = print(ProfilePublicationsForSaleDocument);
const PublicationMetadataStatusDocumentString = print(PublicationMetadataStatusDocument);
const CreatePostTypedDataDocumentString = print(CreatePostTypedDataDocument);
const CreatePostViaDispatcherDocumentString = print(CreatePostViaDispatcherDocument);
const CreateCommentTypedDataDocumentString = print(CreateCommentTypedDataDocument);
const CreateCommentViaDispatcherDocumentString = print(CreateCommentViaDispatcherDocument);
const CreateMirrorTypedDataDocumentString = print(CreateMirrorTypedDataDocument);
const CreateMirrorViaDispatcherDocumentString = print(CreateMirrorViaDispatcherDocument);
const CreateCollectTypedDataDocumentString = print(CreateCollectTypedDataDocument);
const HidePublicationDocumentString = print(HidePublicationDocument);
const CreateAttachMediaDataDocumentString = print(CreateAttachMediaDataDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Publication(
      variables: PublicationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: PublicationQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationQuery>(PublicationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Publication',
        'query',
      );
    },
    Publications(
      variables: PublicationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PublicationsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationsQuery>(PublicationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Publications',
        'query',
      );
    },
    ValidatePublicationMetadata(
      variables: ValidatePublicationMetadataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ValidatePublicationMetadataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ValidatePublicationMetadataQuery>(
            ValidatePublicationMetadataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ValidatePublicationMetadata',
        'query',
      );
    },
    WhoCollectedPublication(
      variables: WhoCollectedPublicationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: WhoCollectedPublicationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<WhoCollectedPublicationQuery>(
            WhoCollectedPublicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'WhoCollectedPublication',
        'query',
      );
    },
    ProfilePublicationsForSale(
      variables: ProfilePublicationsForSaleQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: ProfilePublicationsForSaleQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfilePublicationsForSaleQuery>(
            ProfilePublicationsForSaleDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ProfilePublicationsForSale',
        'query',
      );
    },
    PublicationMetadataStatus(
      variables: PublicationMetadataStatusQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PublicationMetadataStatusQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PublicationMetadataStatusQuery>(
            PublicationMetadataStatusDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'PublicationMetadataStatus',
        'query',
      );
    },
    CreatePostTypedData(
      variables: CreatePostTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreatePostTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreatePostTypedDataMutation>(
            CreatePostTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePostTypedData',
        'mutation',
      );
    },
    CreatePostViaDispatcher(
      variables: CreatePostViaDispatcherMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreatePostViaDispatcherMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreatePostViaDispatcherMutation>(
            CreatePostViaDispatcherDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreatePostViaDispatcher',
        'mutation',
      );
    },
    CreateCommentTypedData(
      variables: CreateCommentTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateCommentTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateCommentTypedDataMutation>(
            CreateCommentTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateCommentTypedData',
        'mutation',
      );
    },
    CreateCommentViaDispatcher(
      variables: CreateCommentViaDispatcherMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateCommentViaDispatcherMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateCommentViaDispatcherMutation>(
            CreateCommentViaDispatcherDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateCommentViaDispatcher',
        'mutation',
      );
    },
    CreateMirrorTypedData(
      variables: CreateMirrorTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateMirrorTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMirrorTypedDataMutation>(
            CreateMirrorTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMirrorTypedData',
        'mutation',
      );
    },
    CreateMirrorViaDispatcher(
      variables: CreateMirrorViaDispatcherMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateMirrorViaDispatcherMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMirrorViaDispatcherMutation>(
            CreateMirrorViaDispatcherDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMirrorViaDispatcher',
        'mutation',
      );
    },
    CreateCollectTypedData(
      variables: CreateCollectTypedDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateCollectTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateCollectTypedDataMutation>(
            CreateCollectTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateCollectTypedData',
        'mutation',
      );
    },
    HidePublication(
      variables: HidePublicationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: HidePublicationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<HidePublicationMutation>(HidePublicationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'HidePublication',
        'mutation',
      );
    },
    CreateAttachMediaData(
      variables: CreateAttachMediaDataMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: CreateAttachMediaDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateAttachMediaDataMutation>(
            CreateAttachMediaDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateAttachMediaData',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
