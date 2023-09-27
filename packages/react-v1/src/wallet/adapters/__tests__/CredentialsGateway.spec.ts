import { mockStorage } from '@lens-protocol/storage/mocks';

import { Credentials } from '../Credentials';
import { CredentialsGateway } from '../CredentialsGateway';
import { mockCredentials } from '../__helpers__/mocks';

const credentials = mockCredentials();

const setupGateway = () => {
  const storage = mockStorage<Credentials>();
  return new CredentialsGateway(storage);
};

describe(`Given an instance of the ${CredentialsGateway.name}`, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe(`when "${CredentialsGateway.prototype.save.name}" method is invoked`, () => {
    it('should store the credentials in the underlying storage so they can be retrieve later on', async () => {
      const gateway = setupGateway();

      await gateway.save(credentials);

      const result = await gateway.getCredentials();
      expect(result).toEqual(credentials);
    });
  });

  describe(`when "${CredentialsGateway.prototype.invalidate.name}" method is invoked`, () => {
    it(`should clear the credentials in the underlying storage`, async () => {
      const gateway = setupGateway();

      await gateway.save(credentials);
      await gateway.invalidate();

      const result = await gateway.getCredentials();
      expect(result).toBe(null);
    });
  });
});
