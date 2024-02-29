import { Amount, Matic, success } from '@lens-protocol/shared-kernel';

import { IGenericResultPresenter } from '../transactions/IGenericResultPresenter';

export type ProfilePrices = {
  matic: Amount<Matic>;
};

export interface IGetProfilePriceGateway {
  getMaticPrice(): Promise<Amount<Matic>>;
}

export type IGetProfilePricePresenter = IGenericResultPresenter<ProfilePrices, never>;

export class GetProfilePrice {
  constructor(
    private readonly gateway: IGetProfilePriceGateway,
    private readonly presenter: IGetProfilePricePresenter,
  ) {}

  async execute() {
    const matic = await this.gateway.getMaticPrice();

    this.presenter.present(success({ matic }));
  }
}
