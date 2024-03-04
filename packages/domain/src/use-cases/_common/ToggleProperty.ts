export type TogglePropertyRequest = {
  id: string;
};

export interface ITogglablePropertyGateway<T extends TogglePropertyRequest> {
  on(request: T): Promise<void>;
  off(request: T): Promise<void>;
}

export interface ITogglablePropertyPresenter<T extends TogglePropertyRequest> {
  on(data: T): Promise<void>;
  off(data: T): Promise<void>;
}

export class ToggleProperty<T extends TogglePropertyRequest> {
  constructor(
    private readonly gateway: ITogglablePropertyGateway<T>,
    private readonly presenter: ITogglablePropertyPresenter<T>,
  ) {}

  async on(request: T) {
    await this.presenter.on(request);

    try {
      await this.gateway.on(request);
    } catch (e) {
      await this.presenter.off(request);
      throw e;
    }
  }

  async off(request: T) {
    await this.presenter.off(request);

    try {
      await this.gateway.off(request);
    } catch (e) {
      await this.presenter.on(request);
      throw e;
    }
  }
}
