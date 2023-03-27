import {
  useCreateEncryptedComment as useCreateEncryptedCommentBase,
  ProfileOwnedByMe,
  MetadataUploadHandler,
} from '@lens-protocol/react';

import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseCreateEncryptedCommentArgs = {
  publisher: ProfileOwnedByMe;
  upload: MetadataUploadHandler;
};

/**
 * @category Publications
 * @group Hooks
 */
export function useCreateEncryptedComment(args: UseCreateEncryptedCommentArgs) {
  return useCreateEncryptedCommentBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
