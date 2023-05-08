import { mock } from 'jest-mock-extended';

import { DelegableSigning } from '../../transactions';
import { CreatePost, CreatePostRequest } from '../CreatePost';
import { mockCreatePostRequest } from '../__helpers__/mocks';

describe(`Given an instance of the ${CreatePost.name} interactor`, () => {
  describe('when executed with a CreatePostRequest', () => {
    describe('not flagged off-chain', () => {
      const request = mockCreatePostRequest({
        offChain: false,
      });

      it(`should execute on-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const onChain = mock<DelegableSigning<CreatePostRequest>>();
        const interactor = new CreatePost(onChain, mock<DelegableSigning<CreatePostRequest>>());

        await interactor.execute(request);

        expect(onChain.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('flagged off-chain', () => {
      const request = mockCreatePostRequest({
        offChain: true,
      });

      it(`should execute off-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const offChain = mock<DelegableSigning<CreatePostRequest>>();
        const interactor = new CreatePost(mock<DelegableSigning<CreatePostRequest>>(), offChain);

        await interactor.execute(request);

        expect(offChain.execute).toHaveBeenCalledWith(request);
      });
    });
  });
});
