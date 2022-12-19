import { Maybe, Profile } from '../graphql/generated';
import { TypePolicy } from './TypePolicy';

export function createProfileTypePolicy(): TypePolicy<Profile> {
  return {
    fields: {
      isFollowing: {
        keyArgs: false,
      },

      isFollowedByMe: {
        keyArgs: false,
      },

      isOptimisticFollowedByMe(existing) {
        return existing ?? false;
      },

      attributes: {
        merge(_, incoming) {
          // Attributes are not merged, but replaced cause they are not normalized.
          // (see createAttributeTypePolicy).
          return incoming;
        },
      },

      location(_: Maybe<string> | undefined, { readField }) {
        return (readField('attributes') ?? []).find(({ key }) => key === 'location')?.value ?? null;
      },

      twitter(_: Maybe<string> | undefined, { readField }) {
        return (readField('attributes') ?? []).find(({ key }) => key === 'twitter')?.value ?? null;
      },

      website(_: Maybe<string> | undefined, { readField }) {
        return (readField('attributes') ?? []).find(({ key }) => key === 'website')?.value ?? null;
      },

      ownedByMe() {
        // TODO: implement ownership check using active profile
        return false;
      },
    },
  };
}
