import { buildTestEnvironment } from '../__helpers__';
import { Authentication } from '../authentication';
import { sdkAuthHeaderWrapper } from './sdkAuthHeaderWrapper';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the "${sdkAuthHeaderWrapper.name}" helper`, () => {
  describe(`when the ${Authentication.name} is not available`, () => {
    it(`should provide an empty object as the authentication header`, async () => {
      const sdkWrapper = sdkAuthHeaderWrapper(undefined);
      const callback = jest.fn();
      await sdkWrapper(callback, 'operation');

      expect(callback).toHaveBeenCalledWith({});
    });
  });

  describe(`when the ${Authentication.name} is available but not authenticated`, () => {
    it(`should provide an empty object as the authentication header`, async () => {
      const authentication = new Authentication(testConfig);
      const sdkWrapper = sdkAuthHeaderWrapper(authentication);
      const callback = jest.fn();
      await sdkWrapper(callback, 'operation');

      expect(callback).toHaveBeenCalledWith({});
    });
  });
});
