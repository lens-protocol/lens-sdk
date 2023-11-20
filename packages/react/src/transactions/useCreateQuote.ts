import { Quote } from '@lens-protocol/api-bindings';
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
import { PublicationId } from '@lens-protocol/metadata';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { createQuoteRequest } from './adapters/schemas/builders';
import { useCreateQuoteController } from './adapters/useCreateQuoteController';

/**
 * An object representing the result of a quote creation.
 *
 * It allows to wait for the quote to be fully processed and indexed.
 */
export type QuoteAsyncResult = AsyncTransactionResult<Quote>;

/**
 * Create new quote details.
 */
export type CreateQuoteArgs = {
  /**
   * The publication ID to quote on.
   */
  quoteOn: PublicationId;
  /**
   * The metadata URI.
   */
  metadata: string;
  /**
   * The Open Actions associated with the publication.
   *
   * If none provided the quote will be automatically hosted on Momoka.
   */
  actions?: OpenActionConfig[];
  /**
   * The quote reference policy.
   *
   * Determines the criteria that must be met for a user to be able to comment, quote, or mirror the quote.
   *
   * @defaultValue `{ type: ReferencePolicyType.ANYONE }`
   */
  reference?: ReferencePolicyConfig;
};

/**
 * `useCreateQuote` is React Hook that allows you to create a new Lens Quote.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```ts
 * const { execute, error, loading } = useCreateQuote();
 * ```
 *
 * ## Basic usage
 *
 * Create a text-only quote:
 *
 * ```ts
 * const { execute, error, loading } = useCreateQuote();
 *
 * const quote = async () => {
 *  // create the desired metadata via the `@lens-protocol/metadata` package helpers
 *  const metadata = textOnly({ content: 'Quote content' });
 *
 *  // upload the metadata to a storage provider of your choice, IPFS in this example
 *  const uri = await uploadToIpfs(metadata);
 *
 *  const result = await execute({
 *    quoteOn: publicationId, // the publication ID to quote
 *    metadata: uri
 *  });
 * }
 *```
 *
 * See the [`@lens-protocol/metadata` package](https://github.com/lens-protocol/metadata) for more
 * information on how to create metadata for other types of publications.
 *
 * ## Create an app-specific quote
 *
 * You can create a comment that is specific to an app by defining the `appId` when creating the comment metadata.
 *
 * This allows apps to build custom experiences by only surfacing publications that were created in their app.
 *
 * ```tsx
 * const metadata = textOnly({
 *  content: 'Quote content',
 *  appId: 'my-app-id',
 * });
 *
 * const uri = await uploadToIpfs(metadata);
 *
 * const result = await execute({
 *  quoteOn: publicationId, // the publication ID to quote
 *  metadata: uri
 * });
 * ```
 * @category Publications
 * @group Hooks
 */
export function useCreateQuote(): UseDeferredTask<
  QuoteAsyncResult,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  CreateQuoteArgs
> {
  const { data: session } = useSession();
  const createQuote = useCreateQuoteController();

  return useDeferredTask(async (args: CreateQuoteArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to create a quote. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to create a quote.',
    );

    const request = createQuoteRequest({
      signless: session.profile.signless,
      ...args,
    });

    return createQuote(request);
  });
}
