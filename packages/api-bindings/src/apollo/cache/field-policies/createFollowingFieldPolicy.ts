import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createFollowingFieldPolicy() {
  return cursorBasedPagination([['request', ['for']]]);
}
