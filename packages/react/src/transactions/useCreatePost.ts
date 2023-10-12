import { Post } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  OpenActionConfig,
  ReferencePolicyConfig,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { createPostRequest } from './adapters/schemas/builders';
import { useCreatePostController } from './adapters/useCreatePostController';

export type PostAsyncResult = AsyncTransactionResult<Post>;

export type CreatePostArgs = {
  /**
   * The metadata URI.
   */
  metadata: string;
  /**
   * The Open Actions associated with the publication.
   *
   * If none provided the post will be automatically hosted on Momoka.
   */
  actions?: OpenActionConfig[];
  /**
   * The post reference policy.
   *
   * Determines the criteria that must be met for a user to be able to comment, quote, or mirror the post.
   *
   * @defaultValue `{ type: ReferencePolicyType.ANYONE }`
   */
  reference?: ReferencePolicyConfig;
};

/**
 * `useCreatePost` is React Hook that allows you to create a new Lens Post.
 *
 * ## Migration from v1
 *
 * Replace the `useCreatePost` hook with `useCreatePost` like in the following diff:
 * ```diff
 * - const { execute, error, isPending } = useCreatePost({ publisher, upload: uploadToIpfs });
 * + const { execute, error, loading } = useCreatePost();
 * ```
 * Amend the code that used to call the `execute` function to:
 * ```ts
 * // first: create metadata using the `@lens-protocol/metadata` package
 * const metadata = textOnly({
 *   content: `Hello world!`,
 * });
 *
 * // second: upload it using the upload function you used to pass to `useCreatePost`:
 * const uri = await uploadToIpfs(metadata);
 *
 * // finally, invoke the `execute` function:
 * const result = await execute({
 *   metadata: uri,
 * })
 * ```
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreatePostArgs}
 */
export function useCreatePost(): UseDeferredTask<
  PostAsyncResult,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  CreatePostArgs
> {
  const { data: session } = useSession();
  const createPost = useCreatePostController();

  return useDeferredTask(async (args: CreatePostArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to create a post. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to create a post.',
    );

    const request = createPostRequest({
      delegate: session.profile.lensManager,
      ...args,
    });

    return createPost(request);
  });
}
