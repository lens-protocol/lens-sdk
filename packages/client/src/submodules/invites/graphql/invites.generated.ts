// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import {
  ProfileFragment,
  PostFragment,
  QuoteFragment,
  PaginatedResultInfoFragment,
  CommentFragment,
  MirrorFragment,
  OpenActionResult_KnownCollectOpenActionResult_Fragment,
  OpenActionResult_UnknownOpenActionResult_Fragment,
} from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  ProfileFragmentDoc,
  PostFragmentDoc,
  QuoteFragmentDoc,
  PaginatedResultInfoFragmentDoc,
  CommentFragmentDoc,
  MirrorFragmentDoc,
  OpenActionResultFragmentDoc,
} from '../../../graphql/fragments.generated';
export type InvitedResultFragment = {
  by: string;
  when: string;
  profileMinted: ProfileFragment | null;
};

export type InvitedProfilesQueryVariables = Types.Exact<{
  profileCoverTransform?: Types.InputMaybe<Types.ImageTransform>;
  profilePictureTransform?: Types.InputMaybe<Types.ImageTransform>;
  profileStatsArg?: Types.InputMaybe<Types.ProfileStatsArg>;
  profileStatsCountOpenActionArgs?: Types.InputMaybe<Types.ProfileStatsCountOpenActionArgs>;
  rateRequest?: Types.InputMaybe<Types.RateRequest>;
}>;

export type InvitedProfilesQuery = { invitedProfiles: Array<InvitedResultFragment> };

export type ProfileAlreadyInvitedQueryVariables = Types.Exact<{
  request: Types.AlreadyInvitedCheckRequest;
}>;

export type ProfileAlreadyInvitedQuery = { result: boolean };

export type InviteProfileMutationVariables = Types.Exact<{
  request: Types.InviteRequest;
}>;

export type InviteProfileMutation = { inviteProfile: string | null };

export const InvitedResultFragmentDoc = gql`
  fragment InvitedResult on InvitedResult {
    by
    profileMinted {
      ...Profile
    }
    when
  }
  ${ProfileFragmentDoc}
`;
export const InvitedProfilesDocument = gql`
  query InvitedProfiles(
    $profileCoverTransform: ImageTransform = {}
    $profilePictureTransform: ImageTransform = {}
    $profileStatsArg: ProfileStatsArg = {}
    $profileStatsCountOpenActionArgs: ProfileStatsCountOpenActionArgs = {}
    $rateRequest: RateRequest = { for: USD }
  ) {
    invitedProfiles {
      ...InvitedResult
    }
  }
  ${InvitedResultFragmentDoc}
`;
export const ProfileAlreadyInvitedDocument = gql`
  query ProfileAlreadyInvited($request: AlreadyInvitedCheckRequest!) {
    result: profileAlreadyInvited(request: $request)
  }
`;
export const InviteProfileDocument = gql`
  mutation InviteProfile($request: InviteRequest!) {
    inviteProfile(request: $request)
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const InvitedProfilesDocumentString = print(InvitedProfilesDocument);
const ProfileAlreadyInvitedDocumentString = print(ProfileAlreadyInvitedDocument);
const InviteProfileDocumentString = print(InviteProfileDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    InvitedProfiles(
      variables?: InvitedProfilesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: InvitedProfilesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<InvitedProfilesQuery>(InvitedProfilesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InvitedProfiles',
        'query',
      );
    },
    ProfileAlreadyInvited(
      variables: ProfileAlreadyInvitedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ProfileAlreadyInvitedQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ProfileAlreadyInvitedQuery>(
            ProfileAlreadyInvitedDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ProfileAlreadyInvited',
        'query',
      );
    },
    InviteProfile(
      variables: InviteProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: InviteProfileMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<InviteProfileMutation>(InviteProfileDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InviteProfile',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
