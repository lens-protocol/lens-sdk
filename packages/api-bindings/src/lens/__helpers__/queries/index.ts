import { faker } from '@faker-js/faker';

import { Cursor } from '../../Cursor';

export * from './discovery';
export * from './misc';
export * from './modules';
export * from './notifications';
export * from './profile';
export * from './publication';
export * from './revenue';
export * from './transaction';

export function mockCursor(): Cursor {
  return faker.random.alphaNumeric(10) as Cursor;
}
