import { mock } from 'jest-mock-extended';

import { DelegableSigning } from '../../transactions';
import { CreatePost, CreatePostRequest } from '../CreatePost';
import {
  mockCreatePostRequest,
  mockFreeCollectPolicyConfig,
  mockNoCollectPolicyConfig,
} from '../__helpers__/mocks';

describe(`Given an instance of the ${CreatePost.name} interactor`, () => {
  describe('when executed', () => {
    describe('with a collectable CreatePostRequest', () => {
      const request = mockCreatePostRequest({
        collect: mockFreeCollectPolicyConfig(),
      });

      it(`should execute on-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const onChain = mock<DelegableSigning<CreatePostRequest>>();
        const interactor = new CreatePost(onChain, mock<DelegableSigning<CreatePostRequest>>());

        await interactor.execute(request);

        expect(onChain.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('with a non-collectable CreatePostRequest', () => {
      const request = mockCreatePostRequest({
        collect: mockNoCollectPolicyConfig(),
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
