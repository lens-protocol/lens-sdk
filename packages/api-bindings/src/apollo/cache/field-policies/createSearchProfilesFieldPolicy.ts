import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createSearchProfilesFieldPolicy() {
  return cursorBasedPagination([['request', ['query', 'where']]]);
}
