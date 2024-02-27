import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockPublicationId } from '../../../mocks';
import {
  ToggleProperty,
  ITogglablePropertyGateway,
  ITogglablePropertyPresenter,
  TogglePropertyRequest,
} from '../ToggleProperty';

function mockTogglePropertyRequest(): TogglePropertyRequest {
  return {
    id: mockPublicationId(),
  };
}

describe(`Given the ${ToggleProperty.name} use-case interactor`, () => {
  describe(`when executing the "${ToggleProperty.prototype.on.name}" method`, () => {
    const request = mockTogglePropertyRequest();

    it(`should:
        - present optimistic update
        - toggle on the new property`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();
      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();
      const property = new ToggleProperty(gateway, presenter);

      await property.on(request);

      expect(presenter.on).toHaveBeenCalledWith(request);
    });

    it(`should revert the optimistic update in case of errors and propagate the error`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();
      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();

      when(gateway.on).calledWith(request).mockRejectedValue(new Error(''));

      const property = new ToggleProperty(gateway, presenter);

      await expect(property.on(request)).rejects.toThrow();

      expect(presenter.on).toHaveBeenCalledWith(request);
      expect(presenter.off).toHaveBeenCalledWith(request);
    });
  });

  describe(`when executing the "${ToggleProperty.prototype.off.name}" method`, () => {
    const request = mockTogglePropertyRequest();

    it(`should:
        - present optimistic update
        - toggle off the property`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();
      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();
      const property = new ToggleProperty(gateway, presenter);

      await property.on(request);

      expect(presenter.on).toHaveBeenCalledWith(request);
    });

    it(`should revert the optimistic update in case of errors and propagate the error`, async () => {
      const presenter = mock<ITogglablePropertyPresenter<TogglePropertyRequest>>();
      const gateway = mock<ITogglablePropertyGateway<TogglePropertyRequest>>();

      when(gateway.off).calledWith(request).mockRejectedValue(new Error(''));
      const property = new ToggleProperty(gateway, presenter);

      await expect(property.off(request)).rejects.toThrow();

      expect(presenter.off).toHaveBeenCalledWith(request);
      expect(presenter.on).toHaveBeenCalledWith(request);
    });
  });
});
