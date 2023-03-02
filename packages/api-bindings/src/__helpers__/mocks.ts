import { faker } from '@faker-js/faker';

import { PublicationMainFocus } from '../graphql';
import { PublicationMetadata } from '../metadata';

export function mockPublicationMetadata(
  overrides?: Partial<PublicationMetadata>,
): PublicationMetadata {
  return {
    version: '2.0.0',
    metadata_id: faker.datatype.uuid(),
    content: faker.lorem.paragraph(),
    locale: 'en',
    attributes: [],
    name: 'Test publication',
    mainContentFocus: PublicationMainFocus.TextOnly,
    ...overrides,
  };
}
