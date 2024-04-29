export type ProfileInterestsRequest<T> = {
  interests: T[];
};

export interface IProfileInterestsGateway<T> {
  add(request: ProfileInterestsRequest<T>): Promise<void>;
  remove(request: ProfileInterestsRequest<T>): Promise<void>;
}

export interface IProfileInterestsPresenter<T> {
  add(request: ProfileInterestsRequest<T>): Promise<void>;
  remove(request: ProfileInterestsRequest<T>): Promise<void>;
}

export class ManageProfileInterests<T> {
  constructor(
    private readonly gateway: IProfileInterestsGateway<T>,
    private readonly presenter: IProfileInterestsPresenter<T>,
  ) {}

  async add(request: ProfileInterestsRequest<T>) {
    void this.gateway.add(request);
    await this.presenter.add(request);
  }

  async remove(request: ProfileInterestsRequest<T>) {
    void this.gateway.remove(request);
    await this.presenter.remove(request);
  }
}
