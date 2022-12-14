import { MockedResponse } from '@apollo/client/testing';

import {
  ProfileFieldsFragment,
  ProfilesToFollowQuery,
  ProfilesToFollowDocument,
  Maybe,
  GetProfileByHandleQuery,
  GetProfileByHandleDocument,
  GetProfileByIdDocument,
  GetProfileByIdQuery,
} from '../generated';
import { mockProfileFieldsFragment } from './fragments';

export function mockProfilesToFollowQueryMockedResponse(args: {
  profiles: ProfileFieldsFragment[];
}): MockedResponse<ProfilesToFollowQuery> {
  return {
    request: {
      query: ProfilesToFollowDocument,
    },
    result: {
      data: {
        recommendedProfiles: args.profiles,
      },
    },
  };
}

function mockGetProfileByHandleQuery(
  profile: Maybe<ProfileFieldsFragment>,
): GetProfileByHandleQuery {
  return {
    result: profile,
  };
}

export function mockGetProfileByHandleQueryMockedResponse({
  profile = mockProfileFieldsFragment(),
  handle = profile?.handle ?? 'aave.lens',
}: {
  profile?: Maybe<ProfileFieldsFragment>;
  handle?: string;
} = {}): MockedResponse<GetProfileByHandleQuery> {
  return {
    request: {
      query: GetProfileByHandleDocument,
      variables: {
        handle,
      },
    },
    result: {
      data: mockGetProfileByHandleQuery(profile),
    },
  };
}

export function mockGetProfileByIdQuery(
  profile = mockProfileFieldsFragment(),
): GetProfileByIdQuery {
  return {
    result: profile,
  };
}

export function mockGetProfileByIdQueryMockedResponse({
  profile = mockProfileFieldsFragment(),
  id = profile?.id ?? '0x123',
}: {
  profile: ProfileFieldsFragment;
  id: string;
}): MockedResponse<GetProfileByIdQuery> {
  return {
    request: {
      query: GetProfileByIdDocument,
      variables: {
        id,
      },
    },
    result: {
      data: mockGetProfileByIdQuery(profile),
    },
  };
}
