import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createProfileActionHistoryFieldPolicy() {
  return cursorBasedPagination([]);
}
