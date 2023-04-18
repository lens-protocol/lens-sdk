import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createSearchFieldPolicy() {
  return cursorBasedPagination([['request', ['query', 'type', 'sources']], '$observerId']);
}
