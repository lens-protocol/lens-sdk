import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  PendingSigningRequestError,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '../../../entities';
import {
  mockActiveWallet,
  mockISignedVote,
  mockIUnsignedVote,
  mockWallet,
  mockCreateUnsignedVoteRequest,
  mockIUnsignedVoteFactory,
  mockVotePollRequest,
} from '../../../mocks';
import { IPollVoteRelayer, IVotePollPresenter, VotePoll, VotePollRequest } from '../VotePoll';

function setupTestScenario({ request, voter }: { request: VotePollRequest; voter: Wallet }) {
  const unsignedVote = mockIUnsignedVote(request);
  const factory = mockIUnsignedVoteFactory({
    request: mockCreateUnsignedVoteRequest({ ...request, voter }),
    vote: unsignedVote,
  });
  when;
  const activeWallet = mockActiveWallet({ wallet: voter });
  const presenter = mock<IVotePollPresenter>();
  const relayer = mock<IPollVoteRelayer>();

  const useCase = new VotePoll(factory, activeWallet, presenter, relayer);

  return { presenter, relayer, useCase };
}

describe(`Given the ${VotePoll.name} interactor`, () => {
  const request = mockVotePollRequest();

  describe('when executed', () => {
    it(`should:
        - create an IUnsignedVote
        - use the user's wallet to sign the vote
        - relay the signed vote`, async () => {
      const voter = mockWallet();
      when(voter.signVote).mockImplementation(async (unsignedVote) =>
        success(mockISignedVote(unsignedVote)),
      );

      const { presenter, relayer, useCase } = setupTestScenario({ request, voter });

      await useCase.execute(request);

      expect(relayer.relay).toHaveBeenCalledWith(
        expect.objectContaining({
          pollId: request.pollId,
          signature: expect.any(String),
          choice: request.choice,
        }),
      );
      expect(presenter.present).toHaveBeenCalledWith(success());
    });

    it.each([
      {
        ErrorCtor: PendingSigningRequestError,
        error: new PendingSigningRequestError(),
      },
      {
        ErrorCtor: WalletConnectionError,
        error: new WalletConnectionError(WalletConnectionErrorReason.WRONG_ACCOUNT),
      },
      {
        ErrorCtor: UserRejectedError,
        error: new UserRejectedError('user does not want'),
      },
    ])('should present any "$ErrorCtor.name" the signing fails with', async ({ error }) => {
      const result = failure(error);
      const voter = mockWallet();
      when(voter.signVote).mockResolvedValue(result);

      const { presenter, useCase } = setupTestScenario({ request, voter });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(result);
    });
  });
});
