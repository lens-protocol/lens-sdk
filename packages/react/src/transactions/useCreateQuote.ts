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
      delegate: session.profile.signless,
      ...args,
    });

    return createQuote(request);
  });
}
