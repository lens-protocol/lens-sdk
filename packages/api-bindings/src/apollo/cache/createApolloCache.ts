import {
  ApolloCache,
  FieldPolicy,
  InMemoryCache,
  NormalizedCacheObject,
  ReactiveVar,
  TypePolicy,
} from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import generatedIntrospection, { StrictTypedTypePolicies } from '../../graphql/hooks';
import { createAttributeTypePolicy } from './createAttributeTypePolicy';
import { createExploreProfilesFieldPolicy } from './createExploreProfileFieldPolicy';
import { createExplorePublicationsFieldPolicy } from './createExplorePublicationsFieldPolicy';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';
import { createMediaSetTypePolicy } from './createMediaSetTypePolicy';
import { createMediaTypePolicy } from './createMediaTypePolicy';
import { createNftImageTypePolicy } from './createNftImageTypePolicy';
import { createNotificationsFieldPolicy } from './createNotificationsFieldPolicy';
import { createProfileFieldPolicy } from './createProfileFieldPolicy';
import { createProfileFollowersFieldPolicy } from './createProfileFollowersFieldPolicy';
import { createProfileFollowingFieldPolicy } from './createProfileFollowingFieldPolicy';
import { createProfilePublicationRevenueFieldPolicy } from './createProfilePublicationRevenueFieldPolicy';
import { createProfilePublicationsForSaleFieldPolicy } from './createProfilePublicationsForSaleFieldPolicy';
import { createProfileTypePolicy } from './createProfileTypePolicy';
import { createProfilesFieldPolicy } from './createProfilesFieldPolicy';
import { createPublicationsFieldPolicy } from './createPublicationsFieldPolicy';
import { createRevenueAggregateTypePolicy } from './createRevenueAggregateTypePolicy';
import { createSearchFieldPolicy } from './createSearchFieldPolicy';
import { createWhoReactedPublicationFieldPolicy } from './createWhoReactedPublicationFieldPolicy';
import {
  createCommentTypePolicy,
  createPublicationTypePolicy,
  createPostTypePolicy,
  createPublicationFieldPolicy,
} from './publication';
import { noCachedField } from './utils/noCachedField';
import { notNormalizedType } from './utils/notNormalizedType';

type TypePoliciesArgs = {
  /**
   * @deprecated this should not be provided by the consumer but should be part of `@lens-protocol/api-bindings` exports
   */
  activeWalletVar: ReactiveVar<WalletData | null>;
};

type InheritedTypePolicies = {
  Publication: TypePolicy;
};

function createTypePolicies({
  activeWalletVar,
}: TypePoliciesArgs): StrictTypedTypePolicies & InheritedTypePolicies {
  return {
    Profile: createProfileTypePolicy(activeWalletVar),

    // Comment, Mirror, and Post type policies inherit from Publication type policy
    Publication: createPublicationTypePolicy(),
    Comment: createCommentTypePolicy(),
    Post: createPostTypePolicy(),

    FeedItem: notNormalizedType(),

    MetadataOutput: notNormalizedType(),
    PublicationStats: notNormalizedType({
      fields: {
        commentsTotal: noCachedField(),
      },
    }),
    ProfileStats: notNormalizedType({
      fields: {
        commentsTotal: noCachedField(),
        postsTotal: noCachedField(),
        mirrorsTotal: noCachedField(),
      },
    }),

    AccessConditionOutput: notNormalizedType(),
    EncryptionParamsOutput: notNormalizedType(),

    Attribute: createAttributeTypePolicy(),
    MediaSet: createMediaSetTypePolicy(),
    NftImage: createNftImageTypePolicy(),
    Media: createMediaTypePolicy(),

    RevenueAggregate: createRevenueAggregateTypePolicy(),

    // ensures that no matter what fields we add to it in the future, it will NOT be normalized
    PaginatedResultInfo: notNormalizedType(),

    Query: {
      fields: {
        feed: createFeedFieldPolicy(),
        exploreProfiles: createExploreProfilesFieldPolicy(),
        explorePublications: createExplorePublicationsFieldPolicy(),
        notifications: createNotificationsFieldPolicy(),
        profile: createProfileFieldPolicy() as FieldPolicy<unknown>,
        profiles: createProfilesFieldPolicy(),
        profilePublicationsForSale: createProfilePublicationsForSaleFieldPolicy(),
        publications: createPublicationsFieldPolicy(),
        publication: createPublicationFieldPolicy() as FieldPolicy<unknown>,
        search: createSearchFieldPolicy(),
        whoReactedPublication: createWhoReactedPublicationFieldPolicy(),
        followers: createProfileFollowersFieldPolicy(),
        following: createProfileFollowingFieldPolicy(),
        profilePublicationRevenue: createProfilePublicationRevenueFieldPolicy(),
      },
    },
  };
}

export function createApolloCache({
  activeWalletVar,
}: TypePoliciesArgs): ApolloCache<NormalizedCacheObject> {
  return new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies: createTypePolicies({ activeWalletVar }),
  });
}
