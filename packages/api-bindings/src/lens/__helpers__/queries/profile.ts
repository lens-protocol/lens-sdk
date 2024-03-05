import {
  FollowersDocument,
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
  FollowersVariables,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse, mockAnyResponse } from './helpers';

export function mockProfileResponse({
  variables,
  result,
}: {
  variables: Pick<ProfileVariables, 'request'>;
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
  variables: Pick<ProfilesVariables, 'where' | 'cursor'>;
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
  variables: Pick<MutualFollowersVariables, 'observer' | 'viewing'>;
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
  variables: Pick<FollowersVariables, 'of'>;
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
  variables: Pick<FollowingVariables, 'for'>;
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
  variables: Pick<SearchProfilesVariables, 'limit' | 'query' | 'where'>;
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
  variables: Pick<ProfileRecommendationsVariables, 'for'>;
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
  variables: Pick<WhoActedOnPublicationVariables, 'on' | 'where'>;
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
  variables: Pick<WhoReactedPublicationVariables, 'for' | 'limit' | 'where'>;
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
