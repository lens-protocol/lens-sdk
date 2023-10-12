import { mock } from 'jest-mock-extended';

import { mockMomokaOptionRequest } from '../../publications/__helpers__/mocks';
import { DelegableSigning } from '../DelegableSigning';
import { MomokaOption, MomokaOptionRequest } from '../MomokaOption';

describe(`Given an instance of the ${MomokaOption.name} interactor`, () => {
  describe('when executed with a MomokaOptionRequest', () => {
    describe('not flagged momoka', () => {
      const request = mockMomokaOptionRequest({
        momoka: false,
      });

      it(`should execute on-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const onChain = mock<DelegableSigning<MomokaOptionRequest>>();
        const interactor = new MomokaOption(onChain, mock<DelegableSigning<MomokaOptionRequest>>());

        await interactor.execute(request);

        expect(onChain.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('flagged momoka', () => {
      const request = mockMomokaOptionRequest({
        momoka: true,
      });

      it(`should execute off-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const offChain = mock<DelegableSigning<MomokaOptionRequest>>();
        const interactor = new MomokaOption(
          mock<DelegableSigning<MomokaOptionRequest>>(),
          offChain,
        );

        await interactor.execute(request);

        expect(offChain.execute).toHaveBeenCalledWith(request);
      });
    });
  });
});
