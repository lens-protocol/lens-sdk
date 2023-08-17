// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  ProfileFragment,
  MirrorFragment,
  CommentFragment,
  Eip712TypedDataDomainFragment,
  RelaySuccessFragment,
  LensProfileManagerRelayErrorFragment,
  CreateMomokaPublicationResultFragment,
  RelayErrorFragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  ProfileFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
  Eip712TypedDataDomainFragmentDoc,
  RelaySuccessFragmentDoc,
  LensProfileManagerRelayErrorFragmentDoc,
  CreateMomokaPublicationResultFragmentDoc,
  RelayErrorFragmentDoc,
} from '../../../graphql/fragments.generated';
export type PublicationQueryVariables = Types.Exact<{
  request: Types.PublicationRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type PublicationQuery = {
  result: CommentFragment | MirrorFragment | PostFragment | QuoteFragment;
};

export type PublicationsQueryVariables = Types.Exact<{
  request: Types.PublicationsRequest;
  publicationImageTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
}>;

export type PublicationsQuery = {
  result: {
    items: Array<CommentFragment | MirrorFragment | PostFragment | QuoteFragment>;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export type CreateOnChainPostBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { PostWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnChainCommentBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { CommentWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnChainMirrorBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { MirrorWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaPostBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { PostWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaCommentBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { CommentWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateMomokaMirrorBroadcastItemResultFragment = {
  id: string;
  expiresAt: string;
  typedData: {
    types: { MirrorWithSig: Array<{ name: string; type: string }> };
    domain: Eip712TypedDataDomainFragment;
    value: { nonce: string; deadline: string };
  };
};

export type CreateOnChainPostTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateOnChainPostRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainPostTypedDataMutation = {
  result: CreateOnChainPostBroadcastItemResultFragment;
};

export type CreateOnChainCommentTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateOnChainCommentRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainCommentTypedDataMutation = {
  result: CreateOnChainCommentBroadcastItemResultFragment;
};

export type CreateOnChainMirrorTypedDataMutationVariables = Types.Exact<{
  request: Types.CreateOnChainMirrorRequest;
  options?: Types.InputMaybe<Types.TypedDataOptions>;
}>;

export type CreateOnChainMirrorTypedDataMutation = {
  result: CreateOnChainMirrorBroadcastItemResultFragment;
};

export type CreateMomokaPostTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaPostRequest;
}>;

export type CreateMomokaPostTypedDataMutation = {
  result: CreateMomokaPostBroadcastItemResultFragment;
};

export type CreateMomokaCommentTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaCommentRequest;
}>;

export type CreateMomokaCommentTypedDataMutation = {
  result: CreateMomokaCommentBroadcastItemResultFragment;
};

export type CreateMomokaMirrorTypedDataMutationVariables = Types.Exact<{
  request: Types.MomokaMirrorRequest;
}>;

export type CreateMomokaMirrorTypedDataMutation = {
  result: CreateMomokaMirrorBroadcastItemResultFragment;
};

export type PostOnChainMutationVariables = Types.Exact<{
  request: Types.CreateOnChainPostRequest;
}>;

export type PostOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type CommentOnChainMutationVariables = Types.Exact<{
  request: Types.CreateOnChainCommentRequest;
}>;

export type CommentOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type MirrorOnChainMutationVariables = Types.Exact<{
  request: Types.CreateOnChainMirrorRequest;
}>;

export type MirrorOnChainMutation = {
  result: LensProfileManagerRelayErrorFragment | RelaySuccessFragment;
};

export type PostOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaPostRequest;
}>;

export type PostOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export type CommentOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaCommentRequest;
}>;

export type CommentOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export type MirrorOnMomokaMutationVariables = Types.Exact<{
  request: Types.MomokaMirrorRequest;
}>;

export type MirrorOnMomokaMutation = {
  result: CreateMomokaPublicationResultFragment | RelayErrorFragment;
};

export const CreateOnChainPostBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainPostBroadcastItemResult on CreateOnChainPostBroadcastItemResult {
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateOnChainCommentBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainCommentBroadcastItemResult on CreateOnChainCommentBroadcastItemResult {
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateOnChainMirrorBroadcastItemResultFragmentDoc = gql`
  fragment CreateOnChainMirrorBroadcastItemResult on CreateOnChainMirrorBroadcastItemResult {
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateMomokaPostBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaPostBroadcastItemResult on CreateMomokaPostBroadcastItemResult {
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateMomokaCommentBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaCommentBroadcastItemResult on CreateMomokaCommentBroadcastItemResult {
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const CreateMomokaMirrorBroadcastItemResultFragmentDoc = gql`
  fragment CreateMomokaMirrorBroadcastItemResult on CreateMomokaMirrorBroadcastItemResult {
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
      }
    }
  }
  ${Eip712TypedDataDomainFragmentDoc}
`;
export const PublicationDocument = gql`
  query Publication(
    $request: PublicationRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
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
      ... on Quote {
        ...Quote
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
`;
export const PublicationsDocument = gql`
  query Publications(
    $request: PublicationsRequest!
    $publicationImageTransform: ImageTransform = {}
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
  ) {
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
        ... on Quote {
          ...Quote
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${PostFragmentDoc}
  ${MirrorFragmentDoc}
  ${CommentFragmentDoc}
  ${QuoteFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const CreateOnChainPostTypedDataDocument = gql`
  mutation CreateOnChainPostTypedData(
    $request: CreateOnChainPostRequest!
    $options: TypedDataOptions
  ) {
    result: createOnChainPostTypedData(request: $request, options: $options) {
      ...CreateOnChainPostBroadcastItemResult
    }
  }
  ${CreateOnChainPostBroadcastItemResultFragmentDoc}
`;
export const CreateOnChainCommentTypedDataDocument = gql`
  mutation CreateOnChainCommentTypedData(
    $request: CreateOnChainCommentRequest!
    $options: TypedDataOptions
  ) {
    result: createOnChainCommentTypedData(request: $request, options: $options) {
      ...CreateOnChainCommentBroadcastItemResult
    }
  }
  ${CreateOnChainCommentBroadcastItemResultFragmentDoc}
`;
export const CreateOnChainMirrorTypedDataDocument = gql`
  mutation CreateOnChainMirrorTypedData(
    $request: CreateOnChainMirrorRequest!
    $options: TypedDataOptions
  ) {
    result: createOnChainMirrorTypedData(request: $request, options: $options) {
      ...CreateOnChainMirrorBroadcastItemResult
    }
  }
  ${CreateOnChainMirrorBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaPostTypedDataDocument = gql`
  mutation CreateMomokaPostTypedData($request: MomokaPostRequest!) {
    result: createMomokaPostTypedData(request: $request) {
      ...CreateMomokaPostBroadcastItemResult
    }
  }
  ${CreateMomokaPostBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaCommentTypedDataDocument = gql`
  mutation CreateMomokaCommentTypedData($request: MomokaCommentRequest!) {
    result: createMomokaCommentTypedData(request: $request) {
      ...CreateMomokaCommentBroadcastItemResult
    }
  }
  ${CreateMomokaCommentBroadcastItemResultFragmentDoc}
`;
export const CreateMomokaMirrorTypedDataDocument = gql`
  mutation CreateMomokaMirrorTypedData($request: MomokaMirrorRequest!) {
    result: createMomokaMirrorTypedData(request: $request) {
      ...CreateMomokaMirrorBroadcastItemResult
    }
  }
  ${CreateMomokaMirrorBroadcastItemResultFragmentDoc}
`;
export const PostOnChainDocument = gql`
  mutation PostOnChain($request: CreateOnChainPostRequest!) {
    result: postOnChain(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const CommentOnChainDocument = gql`
  mutation CommentOnChain($request: CreateOnChainCommentRequest!) {
    result: commentOnChain(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const MirrorOnChainDocument = gql`
  mutation MirrorOnChain($request: CreateOnChainMirrorRequest!) {
    result: mirrorOnChain(request: $request) {
      ... on RelaySuccess {
        ...RelaySuccess
      }
      ... on LensProfileManagerRelayError {
        ...LensProfileManagerRelayError
      }
    }
  }
  ${RelaySuccessFragmentDoc}
  ${LensProfileManagerRelayErrorFragmentDoc}
`;
export const PostOnMomokaDocument = gql`
  mutation PostOnMomoka($request: MomokaPostRequest!) {
    result: postOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const CommentOnMomokaDocument = gql`
  mutation CommentOnMomoka($request: MomokaCommentRequest!) {
    result: commentOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;
export const MirrorOnMomokaDocument = gql`
  mutation MirrorOnMomoka($request: MomokaMirrorRequest!) {
    result: mirrorOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        ...CreateMomokaPublicationResult
      }
      ... on RelayError {
        ...RelayError
      }
    }
  }
  ${CreateMomokaPublicationResultFragmentDoc}
  ${RelayErrorFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PublicationDocumentString = print(PublicationDocument);
const PublicationsDocumentString = print(PublicationsDocument);
const CreateOnChainPostTypedDataDocumentString = print(CreateOnChainPostTypedDataDocument);
const CreateOnChainCommentTypedDataDocumentString = print(CreateOnChainCommentTypedDataDocument);
const CreateOnChainMirrorTypedDataDocumentString = print(CreateOnChainMirrorTypedDataDocument);
const CreateMomokaPostTypedDataDocumentString = print(CreateMomokaPostTypedDataDocument);
const CreateMomokaCommentTypedDataDocumentString = print(CreateMomokaCommentTypedDataDocument);
const CreateMomokaMirrorTypedDataDocumentString = print(CreateMomokaMirrorTypedDataDocument);
const PostOnChainDocumentString = print(PostOnChainDocument);
const CommentOnChainDocumentString = print(CommentOnChainDocument);
const MirrorOnChainDocumentString = print(MirrorOnChainDocument);
const PostOnMomokaDocumentString = print(PostOnMomokaDocument);
const CommentOnMomokaDocumentString = print(CommentOnMomokaDocument);
const MirrorOnMomokaDocumentString = print(MirrorOnMomokaDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Publication(
      variables: PublicationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
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
      requestHeaders?: GraphQLClientRequestHeaders,
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
    CreateOnChainPostTypedData(
      variables: CreateOnChainPostTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainPostTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainPostTypedDataMutation>(
            CreateOnChainPostTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainPostTypedData',
        'mutation',
      );
    },
    CreateOnChainCommentTypedData(
      variables: CreateOnChainCommentTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainCommentTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainCommentTypedDataMutation>(
            CreateOnChainCommentTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainCommentTypedData',
        'mutation',
      );
    },
    CreateOnChainMirrorTypedData(
      variables: CreateOnChainMirrorTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateOnChainMirrorTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateOnChainMirrorTypedDataMutation>(
            CreateOnChainMirrorTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOnChainMirrorTypedData',
        'mutation',
      );
    },
    CreateMomokaPostTypedData(
      variables: CreateMomokaPostTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaPostTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaPostTypedDataMutation>(
            CreateMomokaPostTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaPostTypedData',
        'mutation',
      );
    },
    CreateMomokaCommentTypedData(
      variables: CreateMomokaCommentTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaCommentTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaCommentTypedDataMutation>(
            CreateMomokaCommentTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaCommentTypedData',
        'mutation',
      );
    },
    CreateMomokaMirrorTypedData(
      variables: CreateMomokaMirrorTypedDataMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CreateMomokaMirrorTypedDataMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateMomokaMirrorTypedDataMutation>(
            CreateMomokaMirrorTypedDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateMomokaMirrorTypedData',
        'mutation',
      );
    },
    PostOnChain(
      variables: PostOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PostOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostOnChainMutation>(PostOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PostOnChain',
        'mutation',
      );
    },
    CommentOnChain(
      variables: CommentOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CommentOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CommentOnChainMutation>(CommentOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CommentOnChain',
        'mutation',
      );
    },
    MirrorOnChain(
      variables: MirrorOnChainMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MirrorOnChainMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MirrorOnChainMutation>(MirrorOnChainDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MirrorOnChain',
        'mutation',
      );
    },
    PostOnMomoka(
      variables: PostOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: PostOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostOnMomokaMutation>(PostOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PostOnMomoka',
        'mutation',
      );
    },
    CommentOnMomoka(
      variables: CommentOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: CommentOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CommentOnMomokaMutation>(CommentOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CommentOnMomoka',
        'mutation',
      );
    },
    MirrorOnMomoka(
      variables: MirrorOnMomokaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MirrorOnMomokaMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MirrorOnMomokaMutation>(MirrorOnMomokaDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MirrorOnMomoka',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
