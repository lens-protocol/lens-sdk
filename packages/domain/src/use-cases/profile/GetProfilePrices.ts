import { Amount, Matic, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';

export type ProfilePrices = {
  matic: Amount<Matic>;
};

/**
 * Error thrown when reading the profile price fails.
 *
 * See the error message for more details.
 */
export class ReadPriceError extends Error {
  name = 'ReadPriceError' as const;

  constructor(cause: Error) {
    super(cause.message, { cause });
  }
}

export interface IGetProfilePricesGateway {
  getMaticPrice(): PromiseResult<Amount<Matic>, ReadPriceError>;
}

export type IGetProfilePricesPresenter = IGenericResultPresenter<ProfilePrices, ReadPriceError>;

export class GetProfilePrices {
  constructor(
    private readonly gateway: IGetProfilePricesGateway,
    private readonly presenter: IGetProfilePricesPresenter,
  ) {}

  async execute() {
    const maticResult = await this.gateway.getMaticPrice();

    if (maticResult.isFailure()) {
      this.presenter.present(maticResult);
      return;
    }

    this.presenter.present(success({ matic: maticResult.value }));
  }
}
