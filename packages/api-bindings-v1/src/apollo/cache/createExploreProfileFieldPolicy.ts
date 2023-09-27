import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createExploreProfilesFieldPolicy() {
  return cursorBasedPagination([['request', ['sortCriteria']], '$observerId', '$sources']);
}
