import { WalletConnectionError, WalletConnectionErrorReason } from '@lens-protocol/domain/entities';
import { failure, success } from '@lens-protocol/shared-kernel';

import { PromiseResultPresenter } from '../PromiseResultPresenter';

describe(`Given an instance of the ${PromiseResultPresenter.name}<T>`, () => {
  describe(`when converting the instance into a Result<void, T>`, () => {
    it(`should be able to resolve with a success`, async () => {
      const presenter = new PromiseResultPresenter();

      const promise = presenter.asResult();
      presenter.present(success());
      const result = await promise;

      expect(result.isSuccess()).toBe(true);
    });

    it(`should be able to resolve with a failure`, async () => {
      const presenter = new PromiseResultPresenter();

      const promise = presenter.asResult();
      const err = new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN);
      presenter.present(failure(err));
      const result = await promise;

      expect(() => result.unwrap()).toThrow(WalletConnectionError);
    });
  });
});
