import {
  UseCreateEncryptedPostArgs as UseCreateEncryptedPostBaseArgs,
  useCreateEncryptedPost as useCreateEncryptedPostBase,
} from '../transactions/useCreateEncryptedPost';
import { useBrowserEncryptionConfig } from './useBrowserEncryptionConfig';

export type UseCreateEncryptedPostArgs = Omit<UseCreateEncryptedPostBaseArgs, 'encryption'>;

export function useCreateEncryptedPost(args: UseCreateEncryptedPostArgs) {
  return useCreateEncryptedPostBase({
    ...args,
    encryption: useBrowserEncryptionConfig(),
  });
}
