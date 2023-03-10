import { AuthenticationConfig, IEncryptionProvider } from '@lens-protocol/gated-content';

export type EncryptionConfig = {
  authentication: AuthenticationConfig;
  provider: IEncryptionProvider;
};
