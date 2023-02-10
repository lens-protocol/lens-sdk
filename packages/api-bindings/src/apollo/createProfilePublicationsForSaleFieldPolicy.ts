import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createProfilePublicationsForSaleFieldPolicy() {
  return cursorBasedPagination([['request', ['profileId', 'sources', 'metadata']]]);
}
