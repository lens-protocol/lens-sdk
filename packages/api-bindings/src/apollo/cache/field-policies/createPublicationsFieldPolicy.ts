import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createPublicationsFieldPolicy() {
  return cursorBasedPagination([['request', ['where']]]);
}
