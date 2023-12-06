import { ProfileId } from '../../entities';

export type DismissRecommendedProfilesRequest = {
  profileIds: ProfileId[];
};

export interface IDismissRecommendedProfilesGateway {
  dismiss(request: DismissRecommendedProfilesRequest): Promise<void>;
}

export interface IDismissRecommendedProfilesPresenter {
  present(): Promise<void>;
}

export class DismissRecommendedProfiles {
  constructor(
    private readonly gateway: IDismissRecommendedProfilesGateway,
    private readonly presenter: IDismissRecommendedProfilesPresenter,
  ) {}

  async execute(request: DismissRecommendedProfilesRequest) {
    await this.gateway.dismiss(request);
    await this.presenter.present();
  }
}
