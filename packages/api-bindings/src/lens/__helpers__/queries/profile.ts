import {
  FollowersDocument,
  FollowersVariables,
  FollowingDocument,
  FollowingVariables,
  MutualFollowersDocument,
  MutualFollowersVariables,
  PaginatedResultInfo,
  Profile,
  ProfilesDocument,
  ProfilesVariables,
  SearchProfilesDocument,
  SearchProfilesVariables,
} from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';
import { mockAnyPaginatedResponse } from './mockAnyPaginatedResponse';

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
