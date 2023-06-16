import { failure, success } from '@lens-protocol/shared-kernel';

import {
  PendingSigningRequestError,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { PollId, ISignedVote, IUnsignedVote } from '../../entities/polls';
import { IGenericResultPresenter } from '../transactions';
import { ActiveWallet } from '../wallets';

export type VoteChoice = number | number[];

export type VotePollRequest = {
  pollId: PollId;
  choice: VoteChoice;
};

export type CreateUnsignedVoteRequest = { pollId: PollId; choice: VoteChoice; voter: Wallet };

export interface IUnsignedVoteFactory {
  createUnsignedVote(request: CreateUnsignedVoteRequest): Promise<IUnsignedVote>;
}

export interface IPollVoteRelayer {
  relay(signedVote: ISignedVote): Promise<void>;
}

export type IVotePollPresenter = IGenericResultPresenter<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export class VotePoll {
  constructor(
    private readonly factory: IUnsignedVoteFactory,
    private readonly activeWallet: ActiveWallet,
    private readonly presenter: IVotePollPresenter,
    private readonly relayer: IPollVoteRelayer,
  ) {}

  async execute({ pollId, choice }: VotePollRequest) {
    const wallet = await this.activeWallet.requireActiveWallet();

    const unsignedVote = await this.factory.createUnsignedVote({ pollId, choice, voter: wallet });

    const result = await wallet.signVote(unsignedVote);

    if (result.isFailure()) {
      this.presenter.present(failure(result.error));
      return;
    }

    await this.relayer.relay(result.value);
    this.presenter.present(success());
  }
}
