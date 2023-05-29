import { ApolloCache, InMemoryCache, NormalizedCacheObject, ReactiveVar } from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import generatedIntrospection, { StrictTypedTypePolicies } from '../../graphql/hooks';
import { createAttributeTypePolicy } from './createAttributeTypePolicy';
import { createContentPublicationTypePolicy } from './createContentPublicationTypePolicy';
import { createExploreProfilesFieldPolicy } from './createExploreProfileFieldPolicy';
import { createExplorePublicationsFieldPolicy } from './createExplorePublicationsFieldPolicy';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';
import { createMediaSetTypePolicy } from './createMediaSetTypePolicy';
import { createMediaTypePolicy } from './createMediaTypePolicy';
import { createNftImageTypePolicy } from './createNftImageTypePolicy';
import { createNotificationsFieldPolicy } from './createNotificationsFieldPolicy';
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
import { noCachedField } from './utils/noCachedField';
import { notNormalizedType } from './utils/notNormalizedType';
import { createPublicationFieldPolicy } from './createPublicationFieldPolicy';

type TypePoliciesArgs = {
  /**
   * @deprecated this should not be provided by the consumer but should be part of `@lens-protocol/api-bindings` exports
   */
  activeWalletVar: ReactiveVar<WalletData | null>;
};

function createTypePolicies({ activeWalletVar }: TypePoliciesArgs): StrictTypedTypePolicies {
  return {
    Profile: createProfileTypePolicy(activeWalletVar),
    Post: createContentPublicationTypePolicy(),
    Comment: createContentPublicationTypePolicy(),

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
        profiles: createProfilesFieldPolicy(),
        profilePublicationsForSale: createProfilePublicationsForSaleFieldPolicy(),
        publications: createPublicationsFieldPolicy(),
        publication: createPublicationFieldPolicy(),
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
