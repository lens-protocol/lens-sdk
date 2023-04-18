import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createProfileFollowingFieldPolicy() {
  return cursorBasedPagination([['request', ['address']], '$observerId', '$sources']);
}
