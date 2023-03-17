import { InvariantError } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';

import { IBindings, LensConfig, staging, validateConfig } from '../config';
import { appId } from '../utils';

class DummyStorageProvider {
  getItem(key: string) {
    return key;
  }
  setItem(): void {}
  removeItem(): void {}
}

function bindings(): IBindings {
  const provider = new providers.JsonRpcProvider();
  return {
    getProvider: async () => provider,
    getSigner: async () => provider.getSigner(),
  };
}

const configBase = {
  bindings: bindings(),
  environment: staging,
  storage: new DummyStorageProvider(),
};

const testAppId = appId('test');

describe(`Given the ${validateConfig.name} helper`, () => {
  describe(`when the config has no "appId" nor "sources" defined`, () => {
    it(`should not throw`, async () => {
      const config: LensConfig = {
        ...configBase,
      };

      expect(() => validateConfig(config)).not.toThrow();
    });
  });

  describe(`when the config defines "appId" and no "sources"`, () => {
    it(`should not throw`, async () => {
      const config: LensConfig = {
        ...configBase,
        appId: testAppId,
      };

      expect(() => validateConfig(config)).not.toThrow();
    });
  });

  describe(`when the config defines "appId" and "sources" include the same "appId"`, () => {
    it(`should not throw`, async () => {
      const config: LensConfig = {
        ...configBase,
        appId: testAppId,
        sources: [testAppId],
      };

      expect(() => validateConfig(config)).not.toThrow();
    });
  });

  describe(`when the config defines "appId" and "sources", but "sources" don't include the same "appId"`, () => {
    it(`should throw ${InvariantError.name}`, async () => {
      const config: LensConfig = {
        ...configBase,
        appId: testAppId,
        sources: [],
      };

      expect(() => validateConfig(config)).toThrow(InvariantError);
    });
  });
});
