import { mock } from 'jest-mock-extended';

import { DelegableSigning } from '../../transactions';
import { CreateMirror, CreateMirrorRequest } from '../CreateMirror';
import { mockCreateMirrorRequest } from '../__helpers__/mocks';

describe(`Given an instance of the ${CreateMirror.name} interactor`, () => {
  describe('when executed with a CreateMirrorRequest', () => {
    describe('not flagged off-chain', () => {
      const request = mockCreateMirrorRequest({
        offChain: false,
      });

      it(`should execute on-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const onChain = mock<DelegableSigning<CreateMirrorRequest>>();
        const interactor = new CreateMirror(onChain, mock<DelegableSigning<CreateMirrorRequest>>());

        await interactor.execute(request);

        expect(onChain.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('flagged off-chain', () => {
      const request = mockCreateMirrorRequest({
        offChain: true,
      });

      it(`should execute off-chain ${DelegableSigning.name}<T> strategy`, async () => {
        const offChain = mock<DelegableSigning<CreateMirrorRequest>>();
        const interactor = new CreateMirror(
          mock<DelegableSigning<CreateMirrorRequest>>(),
          offChain,
        );

        await interactor.execute(request);

        expect(offChain.execute).toHaveBeenCalledWith(request);
      });
    });
  });
});
