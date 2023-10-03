import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createPublicationsFieldPolicy() {
  return cursorBasedPagination([
    [
      'request',
      [
        'where',
        [
          'publications',
          'from',
          'publicationTypes',
          'commentOn',
          'mirrorOn',
          'quoteOn',
          'withOpenActions',
          'actedBy',
          'metadata',
          'customFilters',
        ],
      ],
    ],
  ]);
}
