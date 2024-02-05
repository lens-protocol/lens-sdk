import { isValidHandle } from '../profile';

describe(`Given the ${isValidHandle.name} predicate`, () => {
  describe('when called with a prospect Lens handle', () => {
    it('should return true with valid string', () => {
      expect(isValidHandle('valid')).toBe(true);
    });

    it('should return false if below 5 characters', () => {
      expect(isValidHandle('less')).toBe(false);
    });

    it('should return false if above 26 characters', () => {
      expect(isValidHandle('a'.repeat(27))).toBe(false);
    });

    it('should return false if with invalid characters', () => {
      expect(isValidHandle('invalid!')).toBe(false);
    });

    it('should return false if starts with "_"', () => {
      expect(isValidHandle('_invalid')).toBe(false);
    });
  });
});
