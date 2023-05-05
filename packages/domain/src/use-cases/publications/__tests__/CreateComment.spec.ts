import { mock } from 'jest-mock-extended';

import { DelegableSigning } from '../../transactions';
import { CreateComment, CreateCommentRequest } from '../CreateComment';
import { mockCreateCommentRequest } from '../__helpers__/mocks';

describe(`Given an instance of the ${CreateComment.name} interactor`, () => {
  describe('when executed with a CreateCommentRequest', () => {
    describe('flagged for on-chain', () => {
      const request = mockCreateCommentRequest({
        offChain: false,
      });

      it(`should execute on-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const onChain = mock<DelegableSigning<CreateCommentRequest>>();
        const interactor = new CreateComment(
          onChain,
          mock<DelegableSigning<CreateCommentRequest>>(),
        );

        await interactor.execute(request);

        expect(onChain.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('flagged for off-chain', () => {
      const request = mockCreateCommentRequest({
        offChain: true,
      });

      it(`should execute off-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const offChain = mock<DelegableSigning<CreateCommentRequest>>();
        const interactor = new CreateComment(
          mock<DelegableSigning<CreateCommentRequest>>(),
          offChain,
        );

        await interactor.execute(request);

        expect(offChain.execute).toHaveBeenCalledWith(request);
      });
    });
  });
});
