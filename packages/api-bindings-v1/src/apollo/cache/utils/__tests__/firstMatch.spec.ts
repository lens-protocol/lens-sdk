import { firstMatch, Matcher } from '../firstMatch';

describe(`Given the ${firstMatch.name} helper`, () => {
  describe('when called with an empty array', () => {
    it('should return null', () => {
      const candidates: unknown[] = [];
      const matchers: Matcher<unknown, boolean>[] = [(_: unknown) => true];

      const result = firstMatch(candidates, matchers);

      expect(result).toBeNull();
    });
  });

  describe('when called with an array of candidates and matchers', () => {
    it('should return the result of the first matching matcher', () => {
      const candidates = [1, 2, 3];
      const matchers: Matcher<number, string | null>[] = [
        (value) => (value === 2 ? 'two' : null),
        (value) => (value === 3 ? 'three' : null),
        (value) => (value === 4 ? 'four' : null),
      ];

      const result = firstMatch(candidates, matchers);

      expect(result).toEqual('two');
    });

    it('should return null if no matcher matches any candidate', () => {
      const candidates = [1, 2, 3];
      const matchers: Matcher<number, string | null>[] = [
        (value) => (value === 4 ? 'four' : null),
        (value) => (value === 5 ? 'five' : null),
      ];

      const result = firstMatch(candidates, matchers);

      expect(result).toBeNull();
    });

    it('should return the result of the first matching matcher even if subsequent matchers match other candidates', () => {
      const candidates = [1, 2, 3];
      const matchers: Matcher<number, string | null>[] = [
        (value) => (value === 1 ? 'one' : null),
        (value) => (value === 2 ? 'two' : null),
        (value) => (value === 3 ? 'three' : null),
        (value) => (value === 2 ? 'another two' : null),
      ];

      const result = firstMatch(candidates, matchers);

      expect(result).toEqual('one');
    });
  });
});
