import { ProfileAttributes, Maybe, Profile, ProfileAttributeReader } from '../graphql';
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
