import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';
import { Data, Distribute, EvmAddress } from '@lens-protocol/shared-kernel';

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
