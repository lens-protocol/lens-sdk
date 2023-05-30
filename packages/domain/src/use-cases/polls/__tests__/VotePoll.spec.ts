import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockActiveWallet, mockISignedVote, mockIUnsignedVote, mockWallet } from '../../../mocks';
import { IVotePollPresenter, VotePoll, VotePollRequest } from '../VotePoll';
import {
  mockIPollVoteRelayer,
  mockIUnsignedVoteFactory,
  mockVotePollRequest,
} from '../__helpers__/mocks';

function setupTestScenario({
  presenter,
  request,
}: {
  presenter: IVotePollPresenter;
  request: VotePollRequest;
}) {
  const wallet = mockWallet();
  const unsignedVote = mockIUnsignedVote(request);
  const signedVote = mockISignedVote(request);

  when(wallet.signVote).calledWith(unsignedVote).mockResolvedValue(success(signedVote));

  const factory = mockIUnsignedVoteFactory({ request, vote: unsignedVote });
  const activeWallet = mockActiveWallet({ wallet });
  const relayer = mockIPollVoteRelayer({ vote: signedVote });

  const useCase = new VotePoll(factory, activeWallet, presenter, relayer);

  return { useCase };
}

describe(`Given the ${VotePoll.name} interactor`, () => {
  describe('when executed', () => {
    it(`should:
        - create an IUnsignedVote
        - use the user's wallet to sign the vote
        - relay the signed vote`, async () => {
      const request = mockVotePollRequest();
      const presenter = mock<IVotePollPresenter>();

      const { useCase } = setupTestScenario({ presenter, request });

      await useCase.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(success());
    });

    xit('should present the error if the wallet fails to sign the vote', async () => {});
  });
});
