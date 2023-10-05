import { faker } from '@faker-js/faker';

import { Cursor } from '../../Cursor';

export * from './profile';
export * from './publication';

export function mockCursor(): Cursor {
  return faker.random.alphaNumeric(10) as Cursor;
}
