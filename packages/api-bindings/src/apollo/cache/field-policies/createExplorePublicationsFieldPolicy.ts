import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createExplorePublicationsFieldPolicy() {
  return cursorBasedPagination([
    ['request', ['where', ['since', 'publicationTypes', 'customFilters', 'metadata'], 'orderBy']],
  ]);
}
