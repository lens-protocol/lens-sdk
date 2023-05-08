import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';
import { Brand, EthereumAddress } from '@lens-protocol/shared-kernel';

export type Data = Brand<string, 'Data'>;

/**
 * @internal
 * @privateRemarks intentionally not exported
 */
type RawTransactionDetails = {
  contractAddress: EthereumAddress;
  encodedData: Data;
};

type Distribute<TUnion, TAdd> = TUnion extends unknown ? TUnion & TAdd : never;

export type SelfFundedProtocolTransactionRequest<T extends ProtocolTransactionRequestModel> =
  Distribute<T, RawTransactionDetails>;
