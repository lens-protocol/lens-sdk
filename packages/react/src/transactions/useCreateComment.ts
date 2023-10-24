import { Comment } from '@lens-protocol/api-bindings';
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
import { PublicationId } from '@lens-protocol/metadata/*';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { createCommentRequest } from './adapters/schemas/builders';
import { useCreateCommentController } from './adapters/useCreateCommentController';

/**
 * An object representing the result of a comment creation.
 *
 * It allows to wait for the comment to be fully processed and indexed.
 */
export type CommentAsyncResult = AsyncTransactionResult<Comment>;

/**
 * Create new comment details.
 */
export type CreateCommentArgs = {
  /**
   * The publication ID to comment on.
   */
  commentOn: PublicationId;
  /**
   * The metadata URI.
   */
  metadata: string;
  /**
   * The Open Actions associated with the publication.
   *
   * If none provided the comment will be automatically hosted on Momoka.
   */
  actions?: OpenActionConfig[];
  /**
   * The comment reference policy.
   *
   * Determines the criteria that must be met for a user to be able to comment, quote, or mirror the comment.
   *
   * @defaultValue `{ type: ReferencePolicyType.ANYONE }`
   */
  reference?: ReferencePolicyConfig;
};

/**
 * `useCreateComment` is React Hook that allows you to create a new Lens Comment.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```ts
 * const { execute, error, loading } = useCreateComment();
 * ```
 *
 * ## Basic usage
 *
 * Create a text-only comment:
 *
 * ```tsx
 * const { execute, error, loading } = useCreateComment();
 *
 * const comment = (content: string) => {
 *   // create the desired metadata via the `@lens-protocol/metadata` package helpers
 *   const metadata = textOnly({ content });
 *
 *   // upload the metadata to a storage provider of your choice (IPFS in this example)
 *   const uri = await uploadToIpfs(metadata);
 *
 *   // invoke the `execute` function to create the comment
 *   const result = await execute({
 *     metadata: uri,
 *   });
 * }
 * ```
 *
 * See the [`@lens-protocol/metadata` package](https://github.com/lens-protocol/metadata) for more
 * information on how to create metadata for other types of publications.
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` value.
 *
 * ```tsx
 * const { execute, error, loading } = useCreateComment();
 *
 * const comment = async (content: string) => {
 *   // first part is the same as in the initial example
 *
 *   // invoke the `execute` function to create the comment
 *   const result = await execute({
 *     metadata: uri,
 *   });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.constructor) {
 *       case BroadcastingError:
 *         console.log('There was an error broadcasting the transaction', error.message);
 *         break;
 *
 *       case PendingSigningRequestError:
 *         console.log(
 *           'There is a pending signing request in your wallet. ' +
 *             'Approve it or discard it and try again.'
 *         );
 *         break;
 *
 *       case WalletConnectionError:
 *         console.log('There was an error connecting to your wallet', error.message);
 *         break;
 *
 *       case UserRejectedError:
 *         // the user decided to not sign, usually this is silently ignored by UIs
 *         break;
 *     }
 *     return;
 *   }
 * };
 * ```
 * At this point the comment creation is completed from an end-user perspective but,
 * in case of on-chain TX, this not necessarily mined and indexed. See the following section.
 *
 * ## Wait for completion
 *
 * In case of successful submission, the `result` value can be used to wait for the comment to be fully processed.
 *
 * This gives you an opportunity to decide what UX to provide to the end-user.
 *
 * For example if the comment is on-chain it might take a while to be mined and indexed. So you might want to show a loading indicator or
 * let the user navigate away from the page.
 *
 * ```tsx
 * const { execute, error, loading } = useCreateComment();
 *
 * const comment = async (content: string) => {
 *   // first part is the same as in the initial example
 *
 *   // invoke the `execute` function to create the comment
 *   const result = await execute({
 *     commentOn: publicationId, // the publication ID to comment on
 *     metadata: uri,
 *   });
 *
 *   if (result.isFailure()) {
 *     // handle failure scenarios
 *     return;
 *   }
 *
 *   // this might take a while, depends on the type of tx (on-chain or Momoka)
 *   // and the congestion of the network
 *   const completion = await result.value.waitForCompletion();
 *
 *   if (completion.isFailure()) {
 *     console.log('There was an processing the transaction', completion.error.message);
 *     return;
 *   }
 *
 *   // the comment is now ready to be used
 *   const comment = completion.value;
 *   console.log('Comment created', comment);
 * };
 * ```
 *
 * ## Open actions
 *
 * Contextually to the comment creation you can configure the open actions.
 *
 * As with anything involving amounts in the Lens SDK you can use the
 * {@link Amount} helper with currencies from the {@link useCurrencies} hook to
 * create the desired amounts.
 *
 * Create a comment with a SimpleCollectOpenAction module:
 * ```tsx
 * const wmatic = ... // from useCurrencies hook
 *
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *   actions: [
 *     {
 *       type: OpenActionType.SIMPLE_COLLECT,
 *       amount: Amount.erc20(wmatic, 100), // 100 WMATIC
 *       followerOnly: true,
 *       collectLimit: 10,
 *       recipient: '0x4f94FAFEE38F545920485fC747467EFc85C302E0',
 *       endsAt: new Date('2025-12-31T00:00:00.000Z'),
 *     }
 *   ]
 * });
 * ```
 * See {@link SimpleCollectActionConfig} for more details.
 *
 * Create a comment with a multirecipient collect open action:
 * ```tsx
 * const wmatic = ... // from useCurrencies hook
 *
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *   actions: [
 *     {
 *       type: OpenActionType.MULTIRECIPIENT_COLLECT,
 *       amount: Amount.erc20(wmatic, 100), // 100 WMATIC
 *       followerOnly: true,
 *       collectLimit: 10,
 *       recipients: [
 *         {
 *           recipient: '0x4f94FAFEE38F545920485fC747467EFc85C302E0',
 *           split: 0.3, // 30%
 *         },
 *         {
 *           recipient: '0x097A4fE5cfFf0360438990b88549d4288748f6cB',
 *           split: 0.7, // 70%
 *         },
 *       ],
 *       endsAt: new Date('2025-12-31T00:00:00.000Z'),
 *     }
 *   ]
 * });
 * ```
 *
 * See {@link MultirecipientCollectActionConfig} for more details.
 *
 * Finally you can also create a comment with a custom open action (AKA unknown open action):
 *
 * ```tsx
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *   actions: [
 *     {
 *       type: OpenActionType.UNKNOWN_OPEN_ACTION,
 *       address: '0x4f94FAFEE38F545920485fC747467EFc85C302E0',
 *       data: '0x.....'
 *     }
 *   ]
 * });
 * ```
 *
 * See {@link UnknownOpenActionConfig} for more details.
 *
 * ## Reference policy
 *
 * Contextually to the comment creation you can configure the reference policy.
 *
 * A comment with reference policy other than `ANYONE` will be hosted on-chain.
 * If the comment has reference policy `ANYONE` (which is also the default value) and does not have
 * any open actions, it will be hosted on Momoka.
 *
 * No one can comment, quote, or mirror the comment:
 * ```tsx
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *
 *   reference: {
 *     type: ReferencePolicyType.NO_ONE
 *   }
 * });
 * ```
 *
 * Only followers can comment, quote, or mirror the comment:
 * ```tsx
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *
 *   reference: {
 *     type: ReferencePolicyType.FOLLOWERS_ONLY
 *   }
 * });
 * ```
 *
 * You can have finer control over who can comment, quote, or mirror the comment by using the `DEGREES_OF_SEPARATION` reference policy:
 * ```tsx
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *
 *   reference: {
 *     type: ReferencePolicyType.DEGREES_OF_SEPARATION,
 *     params: {
 *       degreesOfSeparation: 2, // followers and followers of your followers
 *       commentsRestricted: true, // can comment
 *       mirrorsRestricted: true, // can mirror
 *       quotesRestricted: false, // cannot quote
 *     }
 *   }
 * });
 * ```
 *
 * You can even set the `DEGREES_OF_SEPARATION` reference policy to follow someone elses graph:
 * ```tsx
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 *
 *   reference: {
 *     type: ReferencePolicyType.DEGREES_OF_SEPARATION,
 *     params: {
 *       degreesOfSeparation: 2, // followers and followers of your followers
 *       commentsRestricted: true, // can comment
 *       mirrorsRestricted: true, // can mirror
 *       quotesRestricted: false, // cannot quote
 *
 *       sourceProfileId: '0x01', // in relation to Profile Id 0x01
 *     }
 *   }
 * });
 * ```
 *
 * See {@link DegreesOfSeparationReferencePolicyConfig} for more details.
 *
 * ## Upgrading from v1
 *
 * Replace the `useCreateComment` hook with `useCreateComment` like in the following diff:
 * ```diff
 * - const { execute, error, isPending } = useCreateComment({ publisher, upload: uploadToIpfs });
 * + const { execute, error, loading } = useCreateComment();
 * ```
 * Amend the code that used to call the `execute` function to:
 * ```ts
 * // first: create metadata using the `@lens-protocol/metadata` package
 * const metadata = textOnly({
 *   content: `Hello world!`,
 * });
 *
 * // second: upload it using the upload function you used to pass to `useCreateComment`:
 * const uri = await uploadToIpfs(metadata);
 *
 * // finally, invoke the `execute` function:
 * const result = await execute({
 *   commentOn: publicationId,
 *   metadata: uri,
 * })
 *
 * // continue as usual
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useCreateComment(): UseDeferredTask<
  CommentAsyncResult,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  CreateCommentArgs
> {
  const { data: session } = useSession();
  const createComment = useCreateCommentController();

  return useDeferredTask(async (args: CreateCommentArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to create a comment. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to create a comment.',
    );

    const request = createCommentRequest({
      delegate: session.profile.signless,
      ...args,
    });

    return createComment(request);
  });
}
