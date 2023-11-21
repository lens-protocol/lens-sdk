import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createProfileRecommendationsFieldPolicy() {
  return cursorBasedPagination([['request', ['for', 'disableML', 'shuffle']]]);
}
