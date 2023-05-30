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
  publication: PollPublication;
};

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
 * @param args - {@link UsePollDetailsArgs}
 *
 * @example
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
