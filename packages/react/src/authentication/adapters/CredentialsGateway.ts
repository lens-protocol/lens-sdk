import {
  ICredentialsWriter,
  ICredentialsReader,
} from '@lens-protocol/domain/use-cases/authentication';
import { IStorage } from '@lens-protocol/storage';

import { Credentials } from './Credentials';

export class CredentialsGateway implements ICredentialsWriter, ICredentialsReader {
  constructor(private readonly credentialsStorage: IStorage<Credentials>) {}

  async getCredentials() {
    return this.credentialsStorage.get();
  }

  async save(credentials: Credentials) {
    await this.credentialsStorage.set(credentials);
  }

  async invalidate() {
    await this.credentialsStorage.reset();
  }
}
