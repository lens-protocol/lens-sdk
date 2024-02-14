import { Credentials } from '../../entities';

export interface ICredentialsWriter {
  save(credentials: Credentials): Promise<void>;
}
