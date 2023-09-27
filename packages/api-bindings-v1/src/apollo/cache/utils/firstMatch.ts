export type Matcher<T, R> = (value: T) => R | null;

export function firstMatch<T, R>(candidates: T[], matchers: Matcher<T, R>[]): R | null {
  if (candidates.length === 0) {
    return null;
  }

  for (const candidate of candidates) {
    for (const matcher of matchers) {
      const result = matcher(candidate);
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
}
