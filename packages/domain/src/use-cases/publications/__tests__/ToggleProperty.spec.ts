import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  ToggleProperty,
  ITogglablePropertyGateway,
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '../ToggleProperty';
import { mockTogglePropertyRequest } from '../__helpers__/mocks';

describe(`Given the ${ToggleProperty.name} use-case interactor`, () => {
  describe(`when executing the "${ToggleProperty.prototype.add.name}" method`, () => {
    const request = mockTogglePropertyRequest();

    it(`should:
        - present optimistic update
        - add new property`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();
      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();
      const property = new ToggleProperty(gateway, presenter);

      await property.add(request);

      expect(presenter.add).toHaveBeenCalledWith(request);
    });

    it(`should revert the optimistic update in case of errors and propagate the error`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();

      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();
      when(gateway.add).calledWith(request).mockRejectedValue(new Error(''));

      const property = new ToggleProperty(gateway, presenter);

      await expect(property.add(request)).rejects.toThrow();

      expect(presenter.add).toHaveBeenCalledWith(request);
      expect(presenter.remove).toHaveBeenCalledWith(request);
    });
  });

  describe(`when executing the "${ToggleProperty.prototype.remove.name}" method`, () => {
    const request = mockTogglePropertyRequest();

    it(`should:
        - present optimistic update
        - remove the property`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();
      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();
      const property = new ToggleProperty(gateway, presenter);

      await property.remove(request);

      expect(presenter.remove).toHaveBeenCalledWith(request);
    });

    it(`should revert the optimistic update in case of errors and propagate the error`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();

      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();
      when(gateway.remove).calledWith(request).mockRejectedValue(new Error(''));
      const property = new ToggleProperty(gateway, presenter);

      await expect(property.remove(request)).rejects.toThrow();

      expect(presenter.remove).toHaveBeenCalledWith(request);
      expect(presenter.add).toHaveBeenCalledWith(request);
    });
  });
});
