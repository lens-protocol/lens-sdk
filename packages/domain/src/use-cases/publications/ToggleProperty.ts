import { PublicationId } from '../../entities';

export type TogglePropertyRequest = {
  publicationId: PublicationId;
};

export interface ITogglablePropertyGateway<T extends TogglePropertyRequest> {
  add(request: T): Promise<void>;
  remove(request: T): Promise<void>;
}

export interface ITogglablePropertyPresenter<T extends TogglePropertyRequest> {
  add(data: T): Promise<void>;
  remove(data: T): Promise<void>;
}

export class ToggleProperty<T extends TogglePropertyRequest> {
  constructor(
    private readonly gateway: ITogglablePropertyGateway<T>,
    private readonly presenter: ITogglablePropertyPresenter<T>,
  ) {}

  async add(request: T) {
    await this.presenter.add(request);

    try {
      await this.gateway.add(request);
    } catch (e) {
      await this.presenter.remove(request);
      throw e;
    }
  }

  async remove(request: T) {
    await this.presenter.remove(request);

    try {
      await this.gateway.remove(request);
    } catch (e) {
      await this.presenter.add(request);
      throw e;
    }
  }
}
