import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { NetworkError } from '../NetworkError';
import {
  IRemoveReactionGateway,
  IRemoveReactionPresenter,
  RemoveReaction,
} from '../RemoveReaction';
import { mockReactionRequest } from '../__helpers__/mocks';

describe(`Given the ${RemoveReaction.name} use-case interactor`, () => {
  describe('when removing a reaction to publication', () => {
    const request = mockReactionRequest();

    it(`should:
        - present optimistic update
        - remove reaction`, async () => {
      const presenter = mock<IRemoveReactionPresenter>();

      const gateway = mock<IRemoveReactionGateway>();
      when(gateway.remove).calledWith(request).mockResolvedValue(success());

      const remove = new RemoveReaction(gateway, presenter);

      await remove.remove(request);

      expect(presenter.presentOptimisticRemove).toHaveBeenCalledWith(request);
    });

    it(`should:
        - present optimistic update
        - revert optimistic update`, async () => {
      const presenter = mock<IRemoveReactionPresenter>();

      const gateway = mock<IRemoveReactionGateway>();
      when(gateway.remove)
        .calledWith(request)
        .mockResolvedValue(failure(new NetworkError(new Error())));

      const removeReaction = new RemoveReaction(gateway, presenter);

      await removeReaction.remove(request);

      expect(presenter.presentOptimisticRemove).toHaveBeenCalledWith(request);
      expect(presenter.revertOptimisticRemove).toHaveBeenCalledWith(request);
    });
  });
});
