import { FieldPolicy, TypePolicy } from '@apollo/client';

import { StrictTypedTypePolicies } from '../../lens';
import {
  createCurrenciesFieldPolicy,
  createExploreProfilesFieldPolicy,
  createExplorePublicationsFieldPolicy,
  createFeedFieldPolicy,
  createFeedHighlightsFieldPolicy,
  createFollowersFieldPolicy,
  createFollowingFieldPolicy,
  createMutualFollowersFieldPolicy,
  createProfileActionHistoryFieldPolicy,
  createProfileRecommendationsFieldPolicy,
  createProfilesFieldPolicy,
  createPublicationFieldPolicy,
  createPublicationsFieldPolicy,
  createSearchProfilesFieldPolicy,
  createSearchPublicationsFieldPolicy,
  createWhoActedOnPublicationFieldPolicy,
  createWhoReactedPublicationFieldPolicy,
} from './field-policies';
import {
  createPrimaryPublicationTypePolicy,
  createProfileOperationsTypePolicy,
  createProfileStatsTypePolicy,
  createProfileTypePolicy,
  createPublicationOperationsTypePolicy,
  createPublicationStatsTypePolicy,
  createPublicationTypePolicy,
  notNormalizedType,
} from './type-policies';

type InheritedTypePolicies = {
  AnyPublication: TypePolicy;
  PublicationMetadata: TypePolicy;
  FeedHighlight: TypePolicy;
};

export function createTypePolicies(): StrictTypedTypePolicies & InheritedTypePolicies {
  return {
    AnyPublication: createPublicationTypePolicy(),
    FeedHighlight: createPublicationTypePolicy(),
    Post: createPrimaryPublicationTypePolicy(),
    Comment: createPrimaryPublicationTypePolicy(),
    Quote: createPrimaryPublicationTypePolicy(),
    ProfileMetadata: notNormalizedType(),
    PublicationMetadata: notNormalizedType(),
    PublicationStats: createPublicationStatsTypePolicy(),
    PublicationOperations: createPublicationOperationsTypePolicy(),

    Profile: createProfileTypePolicy(),
    ProfileStats: createProfileStatsTypePolicy(),
    ProfileOperations: createProfileOperationsTypePolicy(),

    FeedItem: notNormalizedType(),
    PaginatedResultInfo: notNormalizedType(),

    Query: {
      fields: {
        currencies: createCurrenciesFieldPolicy(),
        exploreProfiles: createExploreProfilesFieldPolicy(),
        explorePublications: createExplorePublicationsFieldPolicy(),
        feed: createFeedFieldPolicy(),
        feedHighlights: createFeedHighlightsFieldPolicy(),
        followers: createFollowersFieldPolicy(),
        following: createFollowingFieldPolicy(),
        mutualFollowers: createMutualFollowersFieldPolicy(),
        profileActionHistory: createProfileActionHistoryFieldPolicy(),
        profileRecommendations: createProfileRecommendationsFieldPolicy(),
        // TODO: investigate correct usage of cache redirect
        // profile: createProfileFieldPolicy() as FieldPolicy<unknown>,
        profiles: createProfilesFieldPolicy(),
        publication: createPublicationFieldPolicy() as FieldPolicy<unknown>,
        publications: createPublicationsFieldPolicy(),
        searchProfiles: createSearchProfilesFieldPolicy(),
        searchPublications: createSearchPublicationsFieldPolicy(),
        whoActedOnPublication: createWhoActedOnPublicationFieldPolicy(),
        whoReactedPublication: createWhoReactedPublicationFieldPolicy(),
      },
    },
  };
}
