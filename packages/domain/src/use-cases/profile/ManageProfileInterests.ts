import { ProfileId } from '../../entities';

export type ProfileInterestsRequest = {
  profileId: ProfileId;
};

export interface IProfileInterestsGateway {
  add(request: ProfileInterestsRequest): Promise<void>;
  remove(request: ProfileInterestsRequest): Promise<void>;
}

export interface IProfileInterestsPresenter {
  add(request: ProfileInterestsRequest): Promise<void>;
  remove(request: ProfileInterestsRequest): Promise<void>;
}

export class ManageProfileInterests {
  constructor(
    private readonly gateway: IProfileInterestsGateway,
    private readonly presenter: IProfileInterestsPresenter,
  ) {}

  async add(request: ProfileInterestsRequest) {
    void this.gateway.add(request);
    await this.presenter.add(request);
  }

  async remove(request: ProfileInterestsRequest) {
    void this.gateway.remove(request);
    await this.presenter.remove(request);
  }
}
