import {
  FollowersDocument,
  FollowersVariables,
  FollowingDocument,
  FollowingVariables,
  MutualFollowersDocument,
  MutualFollowersVariables,
  PaginatedResultInfo,
  Profile,
  ProfileActionHistory,
  ProfileActionHistoryDocument,
  ProfileActionHistoryVariables,
  ProfileRecommendationsDocument,
  ProfileRecommendationsVariables,
  ProfileWhoReactedResult,
  ProfileDocument,
  ProfilesDocument,
  ProfilesVariables,
  ProfileVariables,
  SearchProfilesDocument,
  SearchProfilesVariables,
  WhoActedOnPublicationDocument,
  WhoActedOnPublicationVariables,
  WhoReactedPublicationDocument,
  WhoReactedPublicationVariables,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse, mockAnyResponse } from './mockAnyPaginatedResponse';

export function mockProfileResponse({
  variables,
  result,
}: {
  variables: ProfileVariables;
  result: Profile | null;
}) {
  return mockAnyResponse({
    request: {
      query: ProfileDocument,
      variables,
    },
    result: {
      data: { result },
    },
  });
}

export function mockProfilesResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: ProfilesVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
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
}) {
  return mockAnyPaginatedResponse({
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
}) {
  return mockAnyPaginatedResponse({
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
}) {
  return mockAnyPaginatedResponse({
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
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: SearchProfilesDocument,
  });
}

export function mockProfileRecommendationsResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: ProfileRecommendationsVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: ProfileRecommendationsDocument,
  });
}

export function mockWhoActedOnPublicationResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: WhoActedOnPublicationVariables;
  items: Profile[];
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: WhoActedOnPublicationDocument,
  });
}

export function mockProfileActionHistoryResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: ProfileActionHistoryVariables;
  items: ProfileActionHistory[];
  info?: PaginatedResultInfo;
}) {
  return {
    request: {
      query: ProfileActionHistoryDocument,
      variables,
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

export function mockWhoReactedToPublicationResponse({
  variables,
  items,
  info = mockPaginatedResultInfo(),
}: {
  variables: WhoReactedPublicationVariables;
  items: ProfileWhoReactedResult[];
  info?: PaginatedResultInfo;
}) {
  return mockAnyPaginatedResponse({
    variables,
    items,
    info,
    query: WhoReactedPublicationDocument,
  });
}
