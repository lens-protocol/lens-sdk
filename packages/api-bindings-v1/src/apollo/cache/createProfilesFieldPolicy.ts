import { cursorBasedPagination } from './utils/cursorBasedPagination';

export function createProfilesFieldPolicy() {
  return cursorBasedPagination([
    ['request', ['ownedBy', 'handles', 'profileIds', 'whoMirroredPublicationId']],
    '$observerId',
    '$sources',
  ]);
}
