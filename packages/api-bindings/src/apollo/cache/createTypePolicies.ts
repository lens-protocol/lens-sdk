import { TypePolicy } from '@apollo/client';

import { StrictTypedTypePolicies } from '../../lens';
import { createPublicationTypePolicy } from './createPublicationTypePolicy';
import { createQueryParamsLocalFields, QueryParams } from './createQueryParamsLocalFields';
import {
  createFeedFieldPolicy,
  createFollowersFieldPolicy,
  createFollowingFieldPolicy,
  createMutualFollowersFieldPolicy,
  createProfileActionHistoryFieldPolicy,
  createProfileRecommendationsFieldPolicy,
  createProfilesFieldPolicy,
  createPublicationsFieldPolicy,
  createSearchProfilesFieldPolicy,
  createSearchPublicationsFieldPolicy,
  createWhoActedOnPublicationFieldPolicy,
  createWhoReactedPublicationFieldPolicy,
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
        profileActionHistory: createProfileActionHistoryFieldPolicy(),
        profileRecommendations: createProfileRecommendationsFieldPolicy(),
        profiles: createProfilesFieldPolicy(),
        publications: createPublicationsFieldPolicy(),
        searchProfiles: createSearchProfilesFieldPolicy(),
        searchPublications: createSearchPublicationsFieldPolicy(),
        whoActedOnPublication: createWhoActedOnPublicationFieldPolicy(),
        whoReactedPublication: createWhoReactedPublicationFieldPolicy(),

        ...createQueryParamsLocalFields(params),
      },
    },
  };
}
