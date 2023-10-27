import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createExploreProfilesFieldPolicy() {
  return cursorBasedPagination([['request', ['where', 'orderBy']]]);
}
