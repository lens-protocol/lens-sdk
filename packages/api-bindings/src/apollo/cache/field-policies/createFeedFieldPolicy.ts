import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createFeedFieldPolicy() {
  return cursorBasedPagination([['request', ['where', ['feedEventItemTypes', 'metadata', 'for']]]]);
}
