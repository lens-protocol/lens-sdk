import { MockedResponse } from '@apollo/client/testing';

import {
  FollowersDocument,
  FollowersVariables,
  FollowingDocument,
  FollowingVariables,
  MutualFollowersDocument,
  MutualFollowersVariables,
  PaginatedResultInfo,
  Profile,
  ProfilesData,
  ProfilesDocument,
  ProfilesVariables,
  SearchProfilesData,
  SearchProfilesDocument,
  SearchProfilesVariables,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

/**
 * All paginated profile responses have the same shape
 */
function mockAnyPaginatedProfilesResponse<V, Q>({
  variables,
  items,
  info = mockPaginatedResultInfo(),
  query,
}: {
  variables: V;
  items: Profile[];
  info?: PaginatedResultInfo;
  query: Q;
}) {
  return {
    request: {
      query,
      variables: {
        profileCoverTransform: {},
        profilePictureTransform: {},
        profileStatsArg: {},
        profileStatsCountOpenActionArgs: {},
        rateRequest: { for: 'USD' },
        ...variables,
      },
    },
    result: {
      data: {
        result: {
          items,
          pageInfo: info,
        },
      },
    },
  };
}

export function mockProfilesResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: ProfilesVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}): MockedResponse<ProfilesData> {
  return mockAnyPaginatedProfilesResponse({
    variables,
    items,
    info,
    query: ProfilesDocument,
  });
}

export function mockMutualFollowersResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: MutualFollowersVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}): MockedResponse<ProfilesData> {
  return mockAnyPaginatedProfilesResponse({
    variables,
    items,
    info,
    query: MutualFollowersDocument,
  });
}

export function mockFollowersResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: FollowersVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}): MockedResponse<ProfilesData> {
  return mockAnyPaginatedProfilesResponse({
    variables,
    items,
    info,
    query: FollowersDocument,
  });
}

export function mockFollowingResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: FollowingVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}): MockedResponse<ProfilesData> {
  return mockAnyPaginatedProfilesResponse({
    variables,
    items,
    info,
    query: FollowingDocument,
  });
}

export function mockSearchProfilesResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: SearchProfilesVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}): MockedResponse<SearchProfilesData> {
  return mockAnyPaginatedProfilesResponse({
    variables,
    items,
    info,
    query: SearchProfilesDocument,
  });
}
