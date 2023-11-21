import { PollPublication } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { VoteChoice } from '@lens-protocol/domain/use-cases/polls';

import { Operation, useOperation } from '../helpers/operations';
import { useVotePollController } from './adapters/useVotePollController';

export type UsePollVoteArgs = {
  /**
   * The publication containing a poll
   *
   * **Pro-tip**: use {@link isPollPublication} to check if the publication contains a poll.
   */
  publication: PollPublication;
};

export type { VoteChoice };

export type PollVoteOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [VoteChoice]
>;

/**
 * Hook to vote on a poll.
 *
 * @experimental
 * @category Publications
 * @group Hooks
 * @param args - {@link UsePollVoteArgs}
 *
 * @example
 *
 * ```tsx
 * import { PollPublication, usePollVote } from '@lens-protocol/react-web';
 *
 * function Poll({ publication }: { publication: PollPublication }) {
 *   const { execute, error, isPending } = usePollDetails({ publication });
 *
 *   const vote = async () => {
 *     const result = await execute({ choice: 0 });
 *
 *     if (result.isFailure()) {
 *       console.error(result.error);
 *     }
 *   }
 *
 *   return (
 *     <button onClick={vote} disabled={isPending}>Vote</button>
 *   );
 * }
 * ```
 */
export function usePollVote({ publication }: UsePollVoteArgs) {
  const vote = useVotePollController();

  return useOperation((choice: VoteChoice) =>
    vote({
      proposalId: publication.contentInsight.proposalId,
      spaceId: publication.contentInsight.spaceId,
      choice,
    }),
  );
}
