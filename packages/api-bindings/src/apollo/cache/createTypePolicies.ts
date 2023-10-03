import { TypePolicy } from '@apollo/client';

import { StrictTypedTypePolicies } from '../../lens';
import { createPublicationsFieldPolicy } from './createPublicationsFieldPolicy';
import { createPublicationTypePolicy } from './publication';
import { notNormalizedType } from './utils/notNormalizedType';

type InheritedTypePolicies = {
  Publication: TypePolicy;
};

export function createTypePolicies(): StrictTypedTypePolicies & InheritedTypePolicies {
  return {
    Publication: createPublicationTypePolicy(),
    Post: notNormalizedType(),
    Comment: notNormalizedType(),
    Quote: notNormalizedType(),
    Mirror: notNormalizedType(),

    PaginatedResultInfo: notNormalizedType(),

    Query: {
      fields: {
        publications: createPublicationsFieldPolicy(),
      },
    },
  };
}
