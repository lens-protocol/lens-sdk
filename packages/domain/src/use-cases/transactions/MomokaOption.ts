import { ProtocolTransactionKind } from '../../entities';
import { DelegableSigning } from './DelegableSigning';

export type MomokaOptionRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: ProtocolTransactionKind;
  /**
   * Whether is possible to delegate the publication signing to the profile's dispatcher.
   */
  delegate: boolean;
  /**
   * Whether the publication should be published on Momoka
   */
  momoka: boolean;
};

export class MomokaOption<TRequest extends MomokaOptionRequest> {
  constructor(
    private readonly onChain: DelegableSigning<TRequest>,
    private readonly momoka: DelegableSigning<TRequest>,
  ) {}

  async execute(request: TRequest) {
    if (request.momoka) {
      await this.momoka.execute(request);
    } else {
      await this.onChain.execute(request);
    }
  }
}
