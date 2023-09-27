import { extractUrls } from '../extractUrls';

describe(`Given the ${extractUrls.name} helper`, () => {
  describe('when called with an empty string', () => {
    it('should return an empty array', () => {
      const inputString = '';
      const urls = extractUrls(inputString);
      expect(urls).toEqual([]);
    });
  });

  describe('when called with a string containing a single URL', () => {
    it('should extract the URL from the string', () => {
      const inputString = 'Check out this website: https://example.com';
      const urls = extractUrls(inputString);
      expect(urls).toEqual(['https://example.com']);
    });
  });

  describe('when called with a string containing multiple URLs', () => {
    it('should extract all URLs from the string', () => {
      const inputString = 'Visit these websites: https://example.com and https://www.openai.com';
      const urls = extractUrls(inputString);
      expect(urls).toEqual(['https://example.com', 'https://www.openai.com']);
    });
  });

  describe('when called with a string containing a URL with query parameters and fragments', () => {
    it('should extract the URL with query parameters and fragments', () => {
      const inputString = 'Check out this URL: https://example.com/path?param=value#fragment';
      const urls = extractUrls(inputString);
      expect(urls).toEqual(['https://example.com/path?param=value#fragment']);
    });
  });

  describe('when called with a string containing URLs with different protocols', () => {
    it('should extract all URLs with different protocols', () => {
      const inputString = 'Visit these websites: http://example.com and ftp://ftp.example.com';
      const urls = extractUrls(inputString);
      expect(urls).toEqual(['http://example.com', 'ftp://ftp.example.com']);
    });
  });
});
