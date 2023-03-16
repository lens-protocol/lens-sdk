import {
  UseCreateEncryptedCommentArgs as UseCreateEncryptedCommentBaseArgs,
  useCreateEncryptedComment as useCreateEncryptedCommentBase,
} from '@lens-protocol/react';

import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseCreateEncryptedCommentArgs = Omit<UseCreateEncryptedCommentBaseArgs, 'encryption'>;

export function useCreateEncryptedComment(args: UseCreateEncryptedCommentArgs) {
  return useCreateEncryptedCommentBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
