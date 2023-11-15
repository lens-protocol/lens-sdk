import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createProfilesFieldPolicy() {
  return cursorBasedPagination([['request', ['where']]]);
}
