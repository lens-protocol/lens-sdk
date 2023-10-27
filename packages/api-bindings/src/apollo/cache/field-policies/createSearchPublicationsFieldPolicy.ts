import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createSearchPublicationsFieldPolicy() {
  return cursorBasedPagination([['request', ['query', 'where']]]);
}
