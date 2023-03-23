import {
  useCreateEncryptedComment as useCreateEncryptedCommentBase,
  ProfileOwnedByMeFragment,
  MetadataUploadHandler,
} from '@lens-protocol/react';

import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseCreateEncryptedCommentArgs = {
  publisher: ProfileOwnedByMeFragment;
  upload: MetadataUploadHandler;
};

export function useCreateEncryptedComment(args: UseCreateEncryptedCommentArgs) {
  return useCreateEncryptedCommentBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
