import { TypePolicy } from '@apollo/client';

import { StrictTypedTypePolicies } from '../../lens';
import { createFeedFieldPolicy } from './createFeedFieldPolicy';
import { createFeedHighlightsFieldPolicy } from './createFeedHighlightsFieldPolicy';
import { createFollowersFieldPolicy } from './createFollowersFieldPolicy';
import { createFollowingFieldPolicy } from './createFollowingFieldPolicy';
import { createMutualFollowersFieldPolicy } from './createMutualFollowersFieldPolicy';
import { createProfilesFieldPolicy } from './createProfilesFieldPolicy';
import { createPublicationTypePolicy } from './createPublicationTypePolicy';
import { createPublicationsFieldPolicy } from './createPublicationsFieldPolicy';
import { createSearchProfilesFieldPolicy } from './createSearchProfilesFieldPolicy';
import { createSearchPublicationsFieldPolicy } from './createSearchPublicationsFieldPolicy';
import { notNormalizedType } from './utils/notNormalizedType';

type InheritedTypePolicies = {
  Publication: TypePolicy;
  FeedHighlight: TypePolicy;
};

export function createTypePolicies(): StrictTypedTypePolicies & InheritedTypePolicies {
  return {
    Publication: createPublicationTypePolicy(),
    Post: notNormalizedType(),
    Comment: notNormalizedType(),
    Quote: notNormalizedType(),
    Mirror: notNormalizedType(),
    FeedItem: notNormalizedType(),
    FeedHighlight: notNormalizedType(),

    PaginatedResultInfo: notNormalizedType(),

    Query: {
      fields: {
        followers: createFollowersFieldPolicy(),
        following: createFollowingFieldPolicy(),
        mutualFollowers: createMutualFollowersFieldPolicy(),
        profiles: createProfilesFieldPolicy(),
        publications: createPublicationsFieldPolicy(),
        searchPublications: createSearchPublicationsFieldPolicy(),
        searchProfiles: createSearchProfilesFieldPolicy(),
        feed: createFeedFieldPolicy(),
        feedHighlights: createFeedHighlightsFieldPolicy(),
      },
    },
  };
}
