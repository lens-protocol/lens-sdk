import { MockedResponse } from '@apollo/client/testing';

import {
  ProfileFieldsFragment,
  ProfilesToFollowQuery,
  ProfilesToFollowDocument,
  Maybe,
  GetProfileQuery,
  GetProfileDocument,
  SingleProfileQueryRequest,
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

function mockGetProfileQuery(profile: Maybe<ProfileFieldsFragment>): GetProfileQuery {
  return {
    result: profile,
  };
}

export function mockGetProfileQueryMockedResponse({
  profile = mockProfileFieldsFragment(),
  request,
  observerId,
}: {
  profile?: Maybe<ProfileFieldsFragment>;
  request: SingleProfileQueryRequest;
  observerId?: string;
}): MockedResponse<GetProfileQuery> {
  return {
    request: {
      query: GetProfileDocument,
      variables: {
        request,
        observerId,
      },
    },
    result: {
      data: mockGetProfileQuery(profile),
    },
  };
}
