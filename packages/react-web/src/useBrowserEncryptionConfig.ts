import { webCryptoProvider } from '@lens-protocol/gated-content';
import { EncryptionConfig } from '@lens-protocol/react';
import { useState } from 'react';

export function useBrowserEncryptionConfig(): EncryptionConfig {
  const [encryption] = useState(() => ({
    authentication: {
      domain: location.host,
      uri: location.href,
    },
    provider: webCryptoProvider(),
  }));

  return encryption;
}
