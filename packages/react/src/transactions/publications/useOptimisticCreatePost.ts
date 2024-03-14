import * as gql from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  CreatePostRequest,
  OpenActionConfig,
  ReferencePolicyConfig,
} from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { PublicationMetadata } from '@lens-protocol/metadata';
import { invariant, success } from '@lens-protocol/shared-kernel';
import { useMemo, useState } from 'react';

import { SessionType, useSession } from '../../authentication';
import { DeferredTaskState, UseDeferredTask } from '../../helpers/tasks';
import { createPostRequest } from '../adapters/schemas/builders';
import { useCreatePostController } from '../adapters/useCreatePostController';
import { IUploader, UploadError } from './IUploader';
import { PublicationMetadataUploader } from './PublicationMetadataUploader';
import { post } from './optimistic';
import { PostAsyncResult } from './useCreatePost';
import { useCreatePostExecutionMode } from './useCreatePostExecutionMode';

/**
 * Create new post details.
 *
 * @experimental This API is experimental and may change or be removed in future versions.
 */
export type OptimisticCreatePostArgs = {
  /**
   * The metadata object created via @lens-protocol/metadata package.
   */
  metadata: PublicationMetadata;
  /**
   * The Open Actions associated with the publication.
   *
   * @defaultValue empty, no open actions
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
  /**
   * Whether the transaction costs should be sponsored by the Lens API or
   * should be paid by the authenticated wallet.
   *
   * There are scenarios where the sponsorship will be denied regardless of this value.
   * See {@link BroadcastingError} with:
   * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
   * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
   * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
   *
   * If not specified, or `true`, the hook will attempt a Signless Experience when possible;
   * otherwise, it will fall back to a signed experience.
   */
  sponsored?: boolean;
};

/**
 * @experimental This API is experimental and may change or be removed in future versions.
 */
export type OptimisticCreatePostData = gql.Post | undefined;

/**
 * @experimental This API is experimental and may change or be removed in future versions.
 */
export type OptimisticCreatePostError =
  | BroadcastingError
  | PendingSigningRequestError
  | InsufficientGasError
  | UserRejectedError
  | UploadError
  | WalletConnectionError
  | TransactionError;

/**
 * `useOptimisticCreatePost` is a React Hook that mirrors the behavior of {@link useCreatePost} but it also
 * provides an optimistic response.
 *
 * **This is still an experimental feature and for now the optimistic behavior is limited to posts
 * created with Signless Experience.**
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```ts
 * const { data, execute, loading, error } = useOptimisticCreatePost(uploader);
 * ```
 *
 * To use the hook, first define an instance of the {@link Uploader} class.
 *
 * In this example, we'll use a Stateless Uploader. This approach necessitates only a function that conforms to the {@link UploadHandler} signature.
 *
 * ```ts
 * const uploadHandler = async (file: File) => {
 *   // upload the file and return the public URI
 *   return 'https://example.com/uploaded-file.jpg';
 * }
 * ```
 *
 * Then, create an instance of the {@link Uploader} class.
 *
 * ```ts
 * const uploader = new Uploader(uploadHandler);
 * ```
 * Then pass the `uploader` to the `useOptimisticCreatePost` hook.
 *
 * To create a post, call the `execute` function with the metadata. Contrary to the `useCreatePost` hook you can pass the whole metadata object to the `execute` function.
 *
 * ```ts
 * const { data, execute, loading, error } = useOptimisticCreatePost(uploader);
 *
 * const post = (content: string) => {
 *   // create the desired metadata via the `@lens-protocol/metadata` package helpers
 *   const metadata = textOnly({ content });
 *
 *   // invoke the `execute` function to create the post
 *   const result = await execute({
 *     metadata,
 *   });
 *
 *   // check for failure scenarios
 *   if (result.isFailure()) {
 *     console.log(result.error.message);
 *   }
 * }
 *
 * return (
 *   // render data as you would do normally with any Post object
 * );
 * ```
 *
 * The `data` property will be updated with the optimistic Post object immediately after the `execute` call.
 *
 * Optionally, you can wait for the full completion of the post creation. .
 *
 * ```ts
 * const post = (content: string) => {
 *   // create the desired metadata via the `@lens-protocol/metadata` package helpers
 *   const metadata = textOnly({ content });
 *
 *   // invoke the `execute` function to create the post
 *   const result = await execute({
 *     metadata,
 *   });
 *
 *   // check for failure scenarios
 *   if (result.isFailure()) {
 *     console.log(result.error.message);
 *   }
 *
 *   // wait for full completion
 *   const completion = await result.value.waitForCompletion();
 *
 *   // check for late failures
 *   if (completion.isFailure()) {
 *     console.log(completion.error.message);
 *     return;
 *   }
 *
 *   console.log(completion.value);
 * }
 *
 * return (
 *   // render data
 * );
 * ```
 *
 * At the end the `data` property will automatically update and the final Post object will be available for further interactions.
 *
 * In case of upload error an new error type {@link UploadError} will be returned both from the `error` property and from the `Result<T, E>` object from the `execute` function.
 *
 * ```ts
 * const { data, execute, loading, error } = useOptimisticCreatePost(uploader);
 *
 * const post = (content: string) => {
 *   // ...
 *   const result = await execute({
 *     metadata,
 *   });
 *
 *   // check for failure scenarios
 *   if (result.isFailure()) {
 *
 *     // check for upload error
 *     if (result.error instanceof UploadError) {
 *        console.log(`There was an error uploading the file', result.error.cause);
 *        return;
 *     }
 *
 *     // other errors handling
 *
 *     return;
 *   }
 * }
 *
 * return (
 *   {error && <p>{error.message}</p>}
 *
 *   // render data
 * );
 * ```
 *
 * @experimental This API is experimental and may change or be removed in future versions without honoring semver.
 */
export function useOptimisticCreatePost(
  uploader: IUploader,
): UseDeferredTask<
  OptimisticCreatePostData,
  OptimisticCreatePostError,
  OptimisticCreatePostArgs,
  PostAsyncResult
> {
  const metadataUploader = useMemo(() => {
    return new PublicationMetadataUploader(uploader);
  }, [uploader]);
  const { data: session } = useSession();
  const resolveExecutionMode = useCreatePostExecutionMode();
  const createPost = useCreatePostController();

  const [state, setState] = useState<
    DeferredTaskState<gql.Post | undefined, OptimisticCreatePostError>
  >({
    called: false,
    loading: false,
    data: undefined,
    error: undefined,
  });

  const execute = async (args: OptimisticCreatePostArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a Profile to post. Use `useLogin` hook to authenticate.',
    );

    const mode = await resolveExecutionMode({
      actions: args.actions,
      author: session.profile,
      sponsored: args.sponsored,
    });

    if (mode.signless) {
      setState({
        called: true,
        loading: true,
        data: post({ by: session.profile, with: args.metadata }),
        error: undefined,
      });
    }

    // upload the metadata
    const upload = await metadataUploader.upload(args.metadata);

    if (upload.isFailure()) {
      setState({
        called: true,
        loading: false,
        data: undefined,
        error: upload.error,
      });
      return upload;
    }

    const request: CreatePostRequest = createPostRequest({
      ...args,
      ...mode,
      metadata: upload.value,
    });

    try {
      const result = await createPost(request);

      if (result.isSuccess()) {
        setState(({ data }) => {
          return {
            called: true,
            loading: false,
            data,
            error: undefined,
          };
        });

        return success({
          async waitForCompletion() {
            setState(({ data }) => {
              return {
                called: true,
                loading: true,
                data,
                error: undefined,
              };
            });

            const completion = await result.value.waitForCompletion();

            if (completion.isSuccess()) {
              setState({
                called: true,
                loading: false,
                data: completion.value,
                error: undefined,
              });
            } else {
              setState({
                called: true,
                loading: false,
                data: undefined,
                error: completion.error,
              });
            }

            return completion;
          },
        });
      } else {
        setState({
          called: true,
          loading: false,
          data: undefined,
          error: result.error,
        });
      }

      return result;
    } catch (err) {
      setState((existing) => {
        return {
          ...existing,
          loading: false,
        } as DeferredTaskState<OptimisticCreatePostData, OptimisticCreatePostError>;
      });
      throw err;
    }
  };

  return {
    ...state,
    execute,
  };
}
