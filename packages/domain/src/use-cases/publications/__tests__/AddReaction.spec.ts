import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { AddReaction, IAddReactionGateway, IAddReactionPresenter } from '../AddReaction';
import { NetworkError } from '../NetworkError';
import { mockReactionRequest } from '../__helpers__/mocks';

describe(`Given the ${AddReaction.name} use-case interactor`, () => {
  describe('when adding a reaction to publication', () => {
    const request = mockReactionRequest();

    it(`should:
        - present optimistic update
        - add new reaction`, async () => {
      const presenter = mock<IAddReactionPresenter>();

      const gateway = mock<IAddReactionGateway>();
      when(gateway.add).calledWith(request).mockResolvedValue(success());

      const addReaction = new AddReaction(gateway, presenter);

      await addReaction.add(request);

      expect(presenter.presentOptimisticAdd).toHaveBeenCalledWith(request);
    });

    it(`should:
        - present optimistic update
        - revert optimistic update`, async () => {
      const presenter = mock<IAddReactionPresenter>();

      const gateway = mock<IAddReactionGateway>();
      when(gateway.add)
        .calledWith(request)
        .mockResolvedValue(failure(new NetworkError(new Error())));

      const addReaction = new AddReaction(gateway, presenter);

      await addReaction.add(request);

      expect(presenter.presentOptimisticAdd).toHaveBeenCalledWith(request);
      expect(presenter.revertOptimisticAdd).toHaveBeenCalledWith(request);
    });
  });
});
