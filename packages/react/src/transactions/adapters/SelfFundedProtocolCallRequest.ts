import { TransactionRequestModel } from '@lens-protocol/domain/entities';
import { Brand, EthereumAddress } from '@lens-protocol/shared-kernel';

export type Data = Brand<string, 'Data'>;

type RawTransactionDetails = {
  contractAddress: EthereumAddress;
  encodedData: Data;
};

export type SelfFundedProtocolCallRequest<T extends TransactionRequestModel> = T &
  RawTransactionDetails;
