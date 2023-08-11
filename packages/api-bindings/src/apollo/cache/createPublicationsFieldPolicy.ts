import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createPublicationsFieldPolicy() {
  return cursorBasedPagination([
    [
      'request',
      [
        'profileId',
        'profileIds',
        'collectedBy',
        'publicationTypes',
        'commentsOf',
        'sources',
        'metadata',
      ],
    ],
    '$observerId',
  ]);
}
