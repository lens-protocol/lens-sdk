import { BaseStorageSchema, IStorageProvider, Storage } from '@lens-protocol/storage';
import { z } from 'zod';

import { EnvironmentConfig } from './environments';

export const AuthSigData = z.object({
  sig: z.string(),
  derivedVia: z.string(),
  signedMessage: z.string(),
  address: z.string(),
});

export type AuthSig = z.infer<typeof AuthSigData>;

export function createAuthStorage(env: EnvironmentConfig, storageProvider: IStorageProvider) {
  const authSigSchema = new BaseStorageSchema(`lens.gated.${env.chainName}`, AuthSigData);
  return Storage.createForSchema(authSigSchema, storageProvider);
}
