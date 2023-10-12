import { DelegableProtocolTransactionRequestModel, DelegableSigning } from './DelegableSigning';

export abstract class MomokaCapable<TRequest extends DelegableProtocolTransactionRequestModel> {
  constructor(
    protected readonly onChain: DelegableSigning<TRequest>,
    protected readonly momoka: DelegableSigning<TRequest>,
  ) {}

  abstract execute(request: TRequest): Promise<void>;
}
