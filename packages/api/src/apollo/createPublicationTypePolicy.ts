import { Comment, Mirror, Post } from '../graphql';
import { TypePolicy } from './TypePolicy';

type R = Post | Comment | Mirror;

export function createPublicationTypePolicy(): TypePolicy<R> {
  return {
    fields: {
      mirrors: {
        // no arguments involved in caching of "mirrors" edge
        keyArgs: false,
      },

      reaction: {
        // no arguments involved in caching of "reaction" edge
        keyArgs: false,
      },

      canComment: {
        keyArgs: false,
      },

      canMirror: {
        keyArgs: false,
      },

      collectedBy: {
        merge: (existing, incoming) => {
          // workaround: try to retain the information even if the publication is updated in
          // cache as part of another query that does not have the collectedBy field
          return existing ?? incoming;
        },
      },

      hasCollectedByMe: {
        keyArgs: false,
      },

      hasOptimisticCollectedByMe(existing: boolean | undefined) {
        return existing ?? false;
      },

      isOptimisticMirroredByMe(existing: boolean | undefined) {
        return existing ?? false;
      },

      ownedByMe() {
        // TODO: implement ownership check using active profile
        return false;
      },
    },
  };
}
