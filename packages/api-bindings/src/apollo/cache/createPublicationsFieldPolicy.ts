import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createPublicationsFieldPolicy() {
  return cursorBasedPagination([
    [
      'request',
      ['profileId', 'collectedBy', 'publicationTypes', 'commentsOf', 'sources', 'metadata'],
    ],
    '$observerId',
  ]);
}
