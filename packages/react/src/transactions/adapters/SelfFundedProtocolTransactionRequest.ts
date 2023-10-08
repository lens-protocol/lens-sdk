import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';
import { Brand, Distribute, EvmAddress } from '@lens-protocol/shared-kernel';

export type Data = Brand<string, 'Data'>;

/**
 * @internal
 * @privateRemarks intentionally not exported
 */
type RawTransactionDetails = {
  contractAddress: EvmAddress;
  encodedData: Data;
};

export type SelfFundedProtocolTransactionRequest<T extends ProtocolTransactionRequestModel> =
  Distribute<T, RawTransactionDetails>;
