import { StoreObject } from '@apollo/client';

export const PUBLICATION_TYPENAME = 'AnyPublication';

export function createPublicationTypePolicy() {
  return {
    keyFields: ({ id }: Readonly<StoreObject>) => `${PUBLICATION_TYPENAME}:${String(id)}`,
  } as const;
}
