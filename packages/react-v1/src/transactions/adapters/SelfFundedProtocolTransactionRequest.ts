import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';
import { Brand, Distribute, EthereumAddress } from '@lens-protocol/shared-kernel';

export type Data = Brand<string, 'Data'>;

/**
 * @internal
 * @privateRemarks intentionally not exported
 */
type RawTransactionDetails = {
  contractAddress: EthereumAddress;
  encodedData: Data;
};

export type SelfFundedProtocolTransactionRequest<T extends ProtocolTransactionRequestModel> =
  Distribute<T, RawTransactionDetails>;
