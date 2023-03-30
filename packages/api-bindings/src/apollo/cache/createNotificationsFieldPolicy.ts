import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createNotificationsFieldPolicy() {
  return cursorBasedPagination([
    ['request', ['profileId', 'sources', 'notificationTypes']],
    '$observerId',
  ]);
}
