import { TypePolicy } from '@apollo/client';

import { StrictTypedTypePolicies } from '../../lens';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';
import { createPublicationTypePolicy } from './createPublicationTypePolicy';
import { createQueryParamsLocalFields, QueryParams } from './createQueryParamsLocalFields';
import {
  createFollowersFieldPolicy,
  createFollowingFieldPolicy,
  createMutualFollowersFieldPolicy,
  createProfileRecommendationsFieldPolicy,
  createProfilesFieldPolicy,
  createPublicationsFieldPolicy,
  createSearchProfilesFieldPolicy,
  createSearchPublicationsFieldPolicy,
  createWhoActedOnPublicationFieldPolicy,
} from './field-policies';
import { notNormalizedType } from './utils/notNormalizedType';

type InheritedTypePolicies = {
  Publication: TypePolicy;
};

export function createTypePolicies(
  params?: QueryParams,
): StrictTypedTypePolicies & InheritedTypePolicies {
  return {
    Publication: createPublicationTypePolicy(),
    Post: notNormalizedType(),
    Comment: notNormalizedType(),
    Quote: notNormalizedType(),
    Mirror: notNormalizedType(),
    FeedItem: notNormalizedType(),

    PaginatedResultInfo: notNormalizedType(),

    Query: {
      fields: {
        feed: createFeedFieldPolicy(),
        followers: createFollowersFieldPolicy(),
        following: createFollowingFieldPolicy(),
        mutualFollowers: createMutualFollowersFieldPolicy(),
        profileRecommendations: createProfileRecommendationsFieldPolicy(),
        profiles: createProfilesFieldPolicy(),
        publications: createPublicationsFieldPolicy(),
        searchProfiles: createSearchProfilesFieldPolicy(),
        searchPublications: createSearchPublicationsFieldPolicy(),
        whoActedOnPublication: createWhoActedOnPublicationFieldPolicy(),
        ...createQueryParamsLocalFields(params),
      },
    },
  };
}
