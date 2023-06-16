import {
  createSnapshotApolloClient,
  SnapshotProposalId,
  SnapshotSpaceId,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { VoteChoice, VotePoll } from '@lens-protocol/domain/use-cases/polls';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { SnapshotVoteFactory } from './SnapshotVoteFactory';
import { SnapshotVoteRelayer } from './SnapshotVoteRelayer';

export type VotePollArgs = {
  spaceId: SnapshotSpaceId;
  proposalId: SnapshotProposalId;
  choice: VoteChoice;
};

export function useVotePollController() {
  const { activeWallet, appId, environment } = useSharedDependencies();

  return async ({ choice, proposalId, spaceId }: VotePollArgs) => {
    const snapshotApolloClient = createSnapshotApolloClient({
      backendURL: environment.snapshot.hub,
    });
    const factory = new SnapshotVoteFactory(snapshotApolloClient, spaceId, appId);

    const relayer = new SnapshotVoteRelayer(environment.snapshot.sequencer);

    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const votePoll = new VotePoll(factory, activeWallet, presenter, relayer);

    await votePoll.execute({ pollId: proposalId, choice });

    return presenter.asResult();
  };
}
