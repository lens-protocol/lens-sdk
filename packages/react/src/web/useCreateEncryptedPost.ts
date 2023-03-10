import { webCryptoProvider } from '@lens-protocol/gated-content/web';

import {
  UseCreateEncryptedPostArgs as UseCreateEncryptedPostBaseArgs,
  useCreateEncryptedPost as useCreateEncryptedPostBase,
} from '../transactions/useCreateEncryptedPost';

export type UseCreateEncryptedPostArgs = Omit<UseCreateEncryptedPostBaseArgs, 'encryption'>;

export function useCreateEncryptedPost(args: UseCreateEncryptedPostArgs) {
  return useCreateEncryptedPostBase({
    ...args,
    encryption: {
      authentication: {
        domain: location.host,
        uri: location.href,
      },
      provider: webCryptoProvider(),
    },
  });
}
