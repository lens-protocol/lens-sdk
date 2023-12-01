import { poll } from './poll';

function onMaxAttempts() {
  return new Error('Max attempts exceeded');
}

describe(`Given the "${poll.name}" helper`, () => {
  describe(`when the condition is fullfilled`, () => {
    it(`should return the result`, async () => {
      const mockApi = async () => {
        return {
          indexed: true,
        };
      };

      const result = await poll({
        fn: () => mockApi(),
        validate: (r: { indexed: boolean }) => {
          return r && r.indexed;
        },
        onMaxAttempts,
        interval: 1,
        maxAttempts: 3,
      });

      expect(result).toEqual({
        indexed: true,
      });
    });
  });

  describe(`when the condition is not fullfilled after the specified maxAttempts`, () => {
    it(`should throw a ${Error.name}`, async () => {
      const mockApi = async () => {
        return {
          indexed: false,
        };
      };

      try {
        await poll({
          fn: () => mockApi(),
          validate: (r: { indexed: boolean }) => {
            return r && r.indexed;
          },
          onMaxAttempts,
          interval: 1,
          maxAttempts: 3,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe(`when the fn throws`, () => {
    it(`should throw the same error`, async () => {
      const mockApi = async () => {
        throw new Error('Some error');
      };

      const result = poll({
        fn: () => mockApi(),
        validate: (r: { indexed: boolean }) => {
          return r && r.indexed;
        },
        onMaxAttempts,
        interval: 1,
        maxAttempts: 3,
      });

      await expect(result).rejects.toThrow('Some error');
    });
  });
});
