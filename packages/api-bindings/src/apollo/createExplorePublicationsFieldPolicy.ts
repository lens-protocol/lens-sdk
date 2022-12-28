import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createExplorePublicationsFieldPolicy() {
  return cursorBasedPagination([
    [
      'request',
      [
        'profileId',
        'sortCriteria',
        'timestamp',
        'publicationTypes',
        'excludeProfileIds',
        'noRandomize',
      ],
    ],
  ]);
}
