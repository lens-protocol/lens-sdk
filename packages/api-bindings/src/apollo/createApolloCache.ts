import {
  ApolloCache,
  InMemoryCache,
  NormalizedCacheObject,
  FieldFunctionOptions,
  FieldPolicy,
  TypePolicy as UnpatchedTypePolicy,
  ReactiveVar,
} from '@apollo/client';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { Overwrite } from '@lens-protocol/shared-kernel';

import generatedIntrospection, { ProfileFieldsFragment } from '../graphql/generated';
import { createAttributeTypePolicy } from './createAttributeTypePolicy';
import { createExploreProfilesFieldPolicy } from './createExploreProfileFieldPolicy';
import { createExplorePublicationsFieldPolicy } from './createExplorePublicationsFieldPolicy';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';
import { createMediaSetTypePolicy } from './createMediaSetTypePolicy';
import { createMediaTypePolicy } from './createMediaTypePolicy';
import { createNftImageTypePolicy } from './createNftImageTypePolicy';
import { createNotificationsFieldPolicy } from './createNotificationsFieldPolicy';
import { createProfileTypePolicy } from './createProfileTypePolicy';
import { createProfilesFieldPolicy } from './createProfilesFieldPolicy';
import { createPublicationTypePolicy } from './createPublicationTypePolicy';
import { createPublicationsFieldPolicy } from './createPublicationsFieldPolicy';
import { createSearchFieldPolicy } from './createSearchFieldPolicy';
import { createWhoReactedPublicationFieldPolicy } from './createWhoReactedPublicationFieldPolicy';

type TypedFieldFunctionOptions<TAll> = Overwrite<
  FieldFunctionOptions,
  {
    readField: <T extends keyof NO, O = TAll, NO = NonNullable<O>>(
      fieldName: T,
      from?: O,
    ) => Readonly<NO[T]> | undefined;
  }
>;

type TypedFieldReadFunction<TExisting, TAll> = (
  existing: Readonly<TExisting> | undefined,
  options: TypedFieldFunctionOptions<TAll>,
) => TExisting | undefined;

export type TypePolicy<T> = Overwrite<
  UnpatchedTypePolicy,
  {
    fields?: Partial<{
      [key in keyof T]: FieldPolicy<T[key]> | TypedFieldReadFunction<T[key], T>;
    }>;
  }
>;

type TypePolicies = {
  [__typename: string]: TypePolicy<unknown>;
};

type TypePoliciesArgs = {
  activeProfileVar: ReactiveVar<ProfileFieldsFragment | null>;
  activeWalletVar: ReactiveVar<WalletData | null>;
};

function createTypePolicies({ activeProfileVar, activeWalletVar }: TypePoliciesArgs): TypePolicies {
  return {
    Profile: createProfileTypePolicy(activeWalletVar),
    Post: createPublicationTypePolicy(activeProfileVar),
    Comment: createPublicationTypePolicy(activeProfileVar),
    Mirror: createPublicationTypePolicy(activeProfileVar),

    FeedItem: {
      keyFields: false,
    },

    Attribute: createAttributeTypePolicy(),
    MediaSet: createMediaSetTypePolicy(),
    NftImage: createNftImageTypePolicy(),
    Media: createMediaTypePolicy(),

    Query: {
      fields: {
        feed: createFeedFieldPolicy(),
        exploreProfiles: createExploreProfilesFieldPolicy(),
        explorePublications: createExplorePublicationsFieldPolicy(),
        notifications: createNotificationsFieldPolicy(),
        profiles: createProfilesFieldPolicy(),
        publications: createPublicationsFieldPolicy(),
        search: createSearchFieldPolicy(),
        whoReactedPublication: createWhoReactedPublicationFieldPolicy(),
      },
    },
  };
}

export function createApolloCache({
  activeProfileVar,
  activeWalletVar,
}: TypePoliciesArgs): ApolloCache<NormalizedCacheObject> {
  return new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    resultCaching: true,
    typePolicies: createTypePolicies({ activeProfileVar, activeWalletVar }),
  });
}
