import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createFeedFieldPolicy() {
  return cursorBasedPagination([
    ['request', ['profileId', 'feedEventItemTypes', 'sources', 'metadata']],
    '$observerId',
  ]);
}
