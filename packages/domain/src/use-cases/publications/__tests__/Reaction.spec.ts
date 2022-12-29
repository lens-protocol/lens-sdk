import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { NetworkError } from '../NetworkError';
import { Reaction, IReactionGateway, IReactionPresenter } from '../Reaction';
import { mockReactionRequest } from '../__helpers__/mocks';

describe(`Given the ${Reaction.name} use-case interactor`, () => {
  describe('when adding a reaction to publication', () => {
    const request = mockReactionRequest();

    it(`should:
        - present optimistic update
        - add new reaction`, async () => {
      const presenter = mock<IReactionPresenter>();

      const gateway = mock<IReactionGateway>();
      when(gateway.add).calledWith(request).mockResolvedValue(success());

      const reaction = new Reaction(gateway, presenter);

      await reaction.add(request);

      expect(presenter.presentOptimisticAdd).toHaveBeenCalledWith(request);
    });

    it(`should:
        - present optimistic update
        - revert optimistic update`, async () => {
      const presenter = mock<IReactionPresenter>();

      const gateway = mock<IReactionGateway>();
      when(gateway.add)
        .calledWith(request)
        .mockResolvedValue(failure(new NetworkError(new Error())));

      const reaction = new Reaction(gateway, presenter);

      await reaction.add(request);

      expect(presenter.presentOptimisticAdd).toHaveBeenCalledWith(request);
      expect(presenter.revertOptimisticAdd).toHaveBeenCalledWith(request);
    });
  });

  describe('when removing a reaction to publication', () => {
    const request = mockReactionRequest();

    it(`should:
        - present optimistic update
        - remove reaction`, async () => {
      const presenter = mock<IReactionPresenter>();

      const gateway = mock<IReactionGateway>();
      when(gateway.remove).calledWith(request).mockResolvedValue(success());

      const reaction = new Reaction(gateway, presenter);

      await reaction.remove(request);

      expect(presenter.presentOptimisticRemove).toHaveBeenCalledWith(request);
    });

    it(`should:
        - present optimistic update
        - revert optimistic update`, async () => {
      const presenter = mock<IReactionPresenter>();

      const gateway = mock<IReactionGateway>();
      when(gateway.remove)
        .calledWith(request)
        .mockResolvedValue(failure(new NetworkError(new Error())));

      const reaction = new Reaction(gateway, presenter);

      await reaction.remove(request);

      expect(presenter.presentOptimisticRemove).toHaveBeenCalledWith(request);
      expect(presenter.revertOptimisticRemove).toHaveBeenCalledWith(request);
    });
  });
});
