import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createProfileFollowersFieldPolicy() {
  return cursorBasedPagination([['request', ['profileId']]]);
}
