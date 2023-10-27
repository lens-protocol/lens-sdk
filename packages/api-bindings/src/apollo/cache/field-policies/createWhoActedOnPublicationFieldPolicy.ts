import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createWhoActedOnPublicationFieldPolicy() {
  return cursorBasedPagination([['request', ['on', 'where']]]);
}
