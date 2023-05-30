import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockPollId, mockWallet } from '../../../entities/__helpers__/mocks';
import { ISignedVote, IUnsignedVote } from '../../../entities/polls';
import {
  CreateUnsignedVoteRequest,
  IPollVoteRelayer,
  IUnsignedVoteFactory,
  VotePollRequest,
} from '../VotePoll';

export function mockVotePollRequest(overrides?: Partial<VotePollRequest>): VotePollRequest {
  return {
    pollId: mockPollId(),
    choice: 0,
    ...overrides,
  };
}

export function mockCreateUnsignedVoteRequest(
  overrides?: Partial<CreateUnsignedVoteRequest>,
): CreateUnsignedVoteRequest {
  return {
    pollId: mockPollId(),
    choice: 0,
    voter: mockWallet(),
    ...overrides,
  };
}

export function mockIUnsignedVoteFactory({
  request,
  vote,
}: {
  request: CreateUnsignedVoteRequest;
  vote: IUnsignedVote;
}): IUnsignedVoteFactory {
  const factory = mock<IUnsignedVoteFactory>();

  when(factory.createUnsignedVote).calledWith(request).mockResolvedValue(vote);

  return factory;
}

export function mockIPollVoteRelayer({ vote }: { vote: ISignedVote }): IPollVoteRelayer {
  const relayer = mock<IPollVoteRelayer>();

  when(relayer.relay).calledWith(vote).mockResolvedValue();

  return relayer;
}
