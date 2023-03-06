import { webCryptoProvider } from '@lens-protocol/gated-content/web';

import {
  UseCreateEncryptedPostArgs as UseCreateEncryptedPostBaseArgs,
  useCreateEncryptedPost as useCreateEncryptedPostBase,
} from '../transactions/useCreateEncryptedPost';

export type UseCreateEncryptedPostArgs = Omit<UseCreateEncryptedPostBaseArgs, 'encryptionProvider'>;

export function useCreateEncryptedPost(args: UseCreateEncryptedPostArgs) {
  return useCreateEncryptedPostBase({
    ...args,
    encryptionProvider: webCryptoProvider(),
  });
}
