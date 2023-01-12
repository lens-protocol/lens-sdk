import { ProfileAttributes, Profile, ProfileAttributeReader } from '../graphql';
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

      coverPicture: {
        merge(_, incoming) {
          return incoming;
        },
      },

      attributesMap(_: unknown, { readField }) {
        return (readField('attributes') ?? []).reduce((acc, attribute) => {
          acc[attribute.key] = new ProfileAttributeReader(attribute);
          return acc;
        }, {} as ProfileAttributes);
      },

      ownedByMe() {
        // TODO: implement ownership check using active profile
        return false;
      },
    },
  };
}
