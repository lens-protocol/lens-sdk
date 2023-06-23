import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Reaction, IReactionGateway, IReactionPresenter, ReactionRequest } from '../Reaction';
import { mockReactionRequest } from '../__helpers__/mocks';

describe(`Given the ${Reaction.name} use-case interactor`, () => {
  describe('when adding a reaction to publication', () => {
    const request = mockReactionRequest();

    it(`should:
        - present optimistic update
        - add new reaction`, async () => {
      const presenter = mock<IReactionPresenter<ReactionRequest>>();
      const gateway = mock<IReactionGateway<ReactionRequest>>();
      const reaction = new Reaction(gateway, presenter);

      await reaction.add(request);

      expect(presenter.add).toHaveBeenCalledWith(request);
    });

    it(`should revert the optimistic update in case of errors and propagate the error`, async () => {
      const presenter = mock<IReactionPresenter<ReactionRequest>>();

      const gateway = mock<IReactionGateway<ReactionRequest>>();
      when(gateway.add).calledWith(request).mockRejectedValue(new Error(''));

      const reaction = new Reaction(gateway, presenter);

      await expect(reaction.add(request)).rejects.toThrow();

      expect(presenter.add).toHaveBeenCalledWith(request);
      expect(presenter.remove).toHaveBeenCalledWith(request);
    });
  });

  describe('when removing a reaction to publication', () => {
    const request = mockReactionRequest();

    it(`should:
        - present optimistic update
        - remove reaction`, async () => {
      const presenter = mock<IReactionPresenter<ReactionRequest>>();
      const gateway = mock<IReactionGateway<ReactionRequest>>();
      const reaction = new Reaction(gateway, presenter);

      await reaction.remove(request);

      expect(presenter.remove).toHaveBeenCalledWith(request);
    });

    it(`should revert the optimistic update in case of errors and propagate the error`, async () => {
      const presenter = mock<IReactionPresenter<ReactionRequest>>();

      const gateway = mock<IReactionGateway<ReactionRequest>>();
      when(gateway.remove).calledWith(request).mockRejectedValue(new Error(''));
      const reaction = new Reaction(gateway, presenter);

      await expect(reaction.remove(request)).rejects.toThrow();

      expect(presenter.remove).toHaveBeenCalledWith(request);
      expect(presenter.add).toHaveBeenCalledWith(request);
    });
  });
});
