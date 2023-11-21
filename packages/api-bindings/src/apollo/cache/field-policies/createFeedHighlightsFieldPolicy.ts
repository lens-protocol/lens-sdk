import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createFeedHighlightsFieldPolicy() {
  return cursorBasedPagination([['request', ['where']]]);
}
