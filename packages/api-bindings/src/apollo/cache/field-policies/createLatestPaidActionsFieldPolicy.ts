import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createLatestPaidActionsFieldPolicy() {
  return cursorBasedPagination(['where', 'filter']);
}
