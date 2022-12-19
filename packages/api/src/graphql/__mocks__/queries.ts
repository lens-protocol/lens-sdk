import { MockedResponse } from '@apollo/client/testing';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  ProfileFieldsFragment,
  ProfilesToFollowQuery,
  ProfilesToFollowDocument,
  Maybe,
  GetProfileQuery,
  GetProfileDocument,
  SingleProfileQueryRequest,
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressDocument,
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

export function mockGetProfileQuery(profile: Maybe<ProfileFieldsFragment>): GetProfileQuery {
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

function mockGetAllProfilesByOwnerAddressQuery(
  profiles: ProfileFieldsFragment[],
): GetAllProfilesByOwnerAddressQuery {
  return {
    profilesByOwner: {
      __typename: 'PaginatedProfileResult',
      items: profiles,
    },
  };
}

export function mockGetAllProfilesByOwnerAddressQueryMockedResponse({
  address,
  profiles = [mockProfileFieldsFragment()],
}: {
  address: EthereumAddress;
  profiles?: ProfileFieldsFragment[];
}): MockedResponse<GetAllProfilesByOwnerAddressQuery> {
  return {
    request: {
      query: GetAllProfilesByOwnerAddressDocument,
      variables: {
        address,
      },
    },
    result: {
      data: mockGetAllProfilesByOwnerAddressQuery(profiles),
    },
  };
}
