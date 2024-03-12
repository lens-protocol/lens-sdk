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
import { useCreatePostExecutionMode } from './useCreatePostRequest';

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
 * @experimental This API is experimental and may change or be removed in future versions.
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
