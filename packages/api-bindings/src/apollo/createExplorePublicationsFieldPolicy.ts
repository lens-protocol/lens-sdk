import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createExplorePublicationsFieldPolicy() {
  return cursorBasedPagination([
    [
      'request',
      ['sortCriteria', 'timestamp', 'publicationTypes', 'excludeProfileIds', 'noRandomize'],
    ],
  ]);
}
