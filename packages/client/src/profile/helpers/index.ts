export function isValidProfileHandle(handle: string): boolean {
  const validationRegex = /^[a-z](?:[a-z0-9_]{4,25})$/;

  return validationRegex.test(handle);
}
