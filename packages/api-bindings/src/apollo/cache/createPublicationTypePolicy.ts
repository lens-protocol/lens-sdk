import { StoreObject } from '@apollo/client';

const publicationTypename = 'Publication';

export function createPublicationTypePolicy() {
  return {
    keyFields: ({ id }: Readonly<StoreObject>) => `${publicationTypename}:${String(id)}`,
  } as const;
}
