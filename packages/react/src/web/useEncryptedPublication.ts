import { ContentPublicationFragment } from '@lens-protocol/api-bindings';

import {
  UseEncryptedPublicationArgs as UseEncryptedPublicationBaseArgs,
  useEncryptedPublication as useEncryptedPublicationBase,
} from '../publication/useEncryptedPublication';
import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseEncryptedPublicationArgs<T extends ContentPublicationFragment> = Omit<
  UseEncryptedPublicationBaseArgs<T>,
  'encryption'
>;

export function useEncryptedPublication<T extends ContentPublicationFragment>(
  args: UseEncryptedPublicationArgs<T>,
) {
  return useEncryptedPublicationBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
