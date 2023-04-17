import { ProfileOwnedByMe } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CreatePostRequest,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { failure, Prettify, PromiseResult } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { FailedUploadError } from './adapters/IMetadataUploader';
import { MetadataUploadHandler } from './adapters/MetadataUploadHandler';
import { useCreatePostController } from './adapters/useCreatePostController';
import { PublicationMetadataUploader } from './infrastructure/PublicationMetadataUploader';

export type UseCreatePostArgs = {
  /**
   * The post author.
   *
   * **Poo-tip**: use the profile instance returned by {@link useActiveProfile} to create a post on behalf of the active profile.
   */
  publisher: ProfileOwnedByMe;
  /**
   * The handler that will be used to upload the post metadata.
   */
  upload: MetadataUploadHandler;
};

export type CreatePostArgs = Prettify<
  Omit<
    CreatePostRequest,
    'kind' | 'delegate' | 'collect' | 'profileId' | 'reference' | 'decryptionCriteria'
  > &
    Partial<Pick<CreatePostRequest, 'collect' | 'reference'>>
>;

export type CreatePostOperation = Operation<
  void,
  | BroadcastingError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError
  | FailedUploadError,
  [CreatePostArgs]
>;

/**
 * @category Publications
 * @group Hooks
 * @param args - {@link UseCreatePostArgs}
 *
 * @example Create a short text-only post
 * ```ts
 * import { uploadToIpfs } from './myIpfsUploader';
 * import { ContentFocus, ProfileOwnedByMe, useCreatePost } from '@lens-protocol/react-web';
 *
 * function PostComposer({ publisher }: { publisher: ProfileOwnedByMe }) {
 *   const { execute: createPost, error, isPending } = useCreatePost({ publisher, upload: uploadToIpfs });
 *
 *   const submit = async (event: React.FormEvent<HTMLFormElement>) => {
 *     event.preventDefault();
 *
 *     const form = event.currentTarget;
 *
 *     const formData = new FormData(form);
 *     const content = (formData.get('content') as string | null) ?? never();
 *
 *     let result = await create({
 *       content,
 *       contentFocus: ContentFocus.TEXT,
 *       locale: 'en',
 *     });
 *
 *     if (result.isSuccess()) {
 *       form.reset();
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={submit}>
 *       <textarea
 *         name="content"
 *         minLength={1}
 *         required
 *         rows={3}
 *         placeholder="What's happening?"
 *         style={{ resize: 'none' }}
 *         disabled={isPending}
 *       ></textarea>
 *
 *       <button type="submit" disabled={isPending}>
 *         Post
 *       </button>
 *
 *       {error && <pre>{error.message}</pre>}
 *     </form>
 *   );
 * }
 * ```
 */
export function useCreatePost({ publisher, upload }: UseCreatePostArgs): CreatePostOperation {
  const { appId } = useSharedDependencies();

  const uploader = new PublicationMetadataUploader(upload);
  const createPost = useCreatePostController({ uploader });

  return useOperation(
    async ({
      collect = { type: CollectPolicyType.NO_COLLECT },
      reference = { type: ReferencePolicyType.ANYONE },
      ...args
    }: CreatePostArgs): PromiseResult<
      void,
      | BroadcastingError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
      | FailedUploadError
    > => {
      try {
        const request: CreatePostRequest = {
          kind: TransactionKind.CREATE_POST,
          collect,
          delegate: publisher.dispatcher !== null,
          profileId: publisher.id,
          reference,
          appId,
          ...args,
        };
        return await createPost(request);
      } catch (err: unknown) {
        if (err instanceof FailedUploadError) {
          return failure(err);
        }
        throw err;
      }
    },
  );
}
