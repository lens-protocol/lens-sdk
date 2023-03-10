import { webCryptoProvider } from '@lens-protocol/gated-content/web';
import { useState } from 'react';

import { EncryptionConfig } from '../EncryptionConfig';

export function useBrowserEncryptionConfig(): EncryptionConfig {
  const [encryption] = useState(() => ({
    authentication: {
      domain: location.host,
      uri: location.href,
    },
    provider,
  }));

  return encryption;
}
const provider = webCryptoProvider();
