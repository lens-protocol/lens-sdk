const validationRegex = /^[a-z](?:[a-z0-9_]{4,25})$/;

/**
 * @group Helpers
 */
export function isValidHandle(handle: string): boolean {
  return validationRegex.test(handle);
}
