import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createWhoReactedPublicationFieldPolicy() {
  return cursorBasedPagination([['request', ['publicationId']], '$observerId', '$sources']);
}
