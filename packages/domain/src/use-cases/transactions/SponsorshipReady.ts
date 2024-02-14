import { ProtocolTransactionRequestModel } from '../../entities';

type WithSponsoredFlag<T extends ProtocolTransactionRequestModel> = T & {
  sponsored: boolean;
};

export abstract class SponsorshipReady<
  TRequest extends WithSponsoredFlag<ProtocolTransactionRequestModel>,
> {
  async execute(request: TRequest): Promise<void> {
    if (request.sponsored) {
      return this.sponsored(request);
    }
    return this.charged(request);
  }

  protected abstract charged(request: TRequest): Promise<void>;

  protected abstract sponsored(request: TRequest): Promise<void>;
}
