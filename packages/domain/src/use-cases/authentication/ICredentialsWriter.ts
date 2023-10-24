import { ICredentials } from '../../entities';

export interface ICredentialsWriter {
  save(credentials: ICredentials): Promise<void>;
}
