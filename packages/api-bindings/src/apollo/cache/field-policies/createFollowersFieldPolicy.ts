import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createFollowersFieldPolicy() {
  return cursorBasedPagination([['request', ['of']]]);
}
