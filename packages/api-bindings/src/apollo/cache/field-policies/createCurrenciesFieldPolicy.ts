import { cursorBasedPagination } from '../utils/cursorBasedPagination';

export function createCurrenciesFieldPolicy() {
  return cursorBasedPagination(false);
}
