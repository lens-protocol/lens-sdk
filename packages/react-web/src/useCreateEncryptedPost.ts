import {
  MetadataUploadHandler,
  ProfileOwnedByMe,
  useCreateEncryptedPost as useCreateEncryptedPostBase,
} from '@lens-protocol/react';

import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseCreateEncryptedPostArgs = {
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

/**
 * @category Publications
 * @group Hooks
 */
export function useCreateEncryptedPost(args: UseCreateEncryptedPostArgs) {
  return useCreateEncryptedPostBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
