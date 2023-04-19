import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createExplorePublicationsFieldPolicy() {
  return cursorBasedPagination([
    [
      'request',
      ['excludeProfileIds', 'metadata', 'publicationTypes', 'sortCriteria', 'sources', 'timestamp'],
    ],
    '$observerId',
  ]);
}
