import { InMemoryStorageProvider } from '@lens-protocol/storage';

import { Credentials } from './Credentials';
import { CredentialsStorage } from './CredentialsStorage';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2Mzc3NTQ2ODEsImV4cCI6MTYzNzc1NDc0MX0.Be1eGBvVuFL4fj4pHHqc0yWDledsgS2GP3Jgonmy-xw';
const identityToken = '';
const refreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjM3NzU0NjgxLCJleHAiOjE2Mzc3NTQ5ODF9.3SqgsVMyqFPBcem2W9Iog91SWC8cIAFixXBkDue73Rc';

describe(`Given the ${CredentialsStorage.name} class`, () => {
  describe(`when ${CredentialsStorage.prototype.set.name} is invoked with credentials`, () => {
    it(`should make the credentials available with ${CredentialsStorage.prototype.get.name} method`, async () => {
      const storage = new CredentialsStorage(new InMemoryStorageProvider(), 'namespace');

      const creds = new Credentials(accessToken, identityToken, refreshToken);
      await storage.set(creds);

      const storedCreds = await storage.get();

      expect(storedCreds).toEqual(creds);
    });
  });
});
