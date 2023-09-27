import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createPublicationsProfileBookmarks() {
  return cursorBasedPagination([['request', ['profileId', 'metadata', 'sources']], '$observerId']);
}
