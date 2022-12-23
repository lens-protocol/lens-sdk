import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createNotificationsFieldPolicy() {
  return cursorBasedPagination(['profileId']);
}
