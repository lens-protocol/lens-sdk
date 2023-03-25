import { ContentPublication } from '@lens-protocol/api-bindings';
import { useEncryptedPublication as useEncryptedPublicationBase } from '@lens-protocol/react';

import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseEncryptedPublicationArgs<T extends ContentPublication> = {
  publication: T;
};

export function useEncryptedPublication<T extends ContentPublication>(
  args: UseEncryptedPublicationArgs<T>,
) {
  return useEncryptedPublicationBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
