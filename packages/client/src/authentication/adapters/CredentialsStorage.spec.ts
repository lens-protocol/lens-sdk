import { Credentials } from './Credentials';
import { CredentialsStorage } from './CredentialsStorage';
import { InMemoryStorageProvider } from './InMemoryStorageProvider';

const accessToken = 'accessToken';
const refreshToken = 'refreshToken';

describe(`Given the ${CredentialsStorage.name} class`, () => {
  describe(`when ${CredentialsStorage.prototype.set.name} is invoked with credentials`, () => {
    it(`should make the credentials available with ${CredentialsStorage.prototype.get.name} method`, async () => {
      const storage = new CredentialsStorage(new InMemoryStorageProvider());

      const creds = new Credentials(accessToken, refreshToken);
      await storage.set(creds);

      const storedCreds = await storage.get();

      expect(storedCreds).toEqual(creds);
    });
  });
});
