import * as Types from '../../graphql/types.generated.js';

import { PostFragment, MirrorFragment, CommentFragment } from '../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  PostFragmentDoc,
  MirrorFragmentDoc,
  CommentFragmentDoc,
} from '../../graphql/fragments.generated';
export type PublicationQueryVariables = Types.Exact<{
  observerId?: Types.Maybe<Types.Scalars['ProfileId']>;
  publicationId: Types.Scalars['InternalPublicationId'];
}>;

export type PublicationQuery = {
  result: Types.Maybe<PostFragment | CommentFragment | MirrorFragment>;
};

export const PublicationDocument = gql`
  query Publication($observerId: ProfileId, $publicationId: InternalPublicationId!) {
    result: publication(request: { publicationId: $publicationId }) {
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

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const PublicationDocumentString = print(PublicationDocument);
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
