import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createMutualFollowersFieldPolicy() {
  return cursorBasedPagination([['request', ['observer', 'viewing']]]);
}
