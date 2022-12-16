import { TransactionRequest } from '@ethersproject/providers';
import { faker } from '@faker-js/faker';
import {
  TransactionRequestModel,
  UnsignedTransaction,
  WalletConnectionError,
  WalletType,
} from '@lens-protocol/domain/entities';
import { mockTransactionRequestModel } from '@lens-protocol/domain/mocks';
import { ChainType, Result } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { ITransactionFactory } from '../../../transactions/adapters/ITransactionFactory';
import { TypedData } from '../../../transactions/adapters/TypedData';
import { ExternalWallet, ITransactionRequest, UnsignedLensProtocolCall } from '../ExternalWallet';
import { ISignerFactory } from '../ISignerFactory';

type MockedISignerFactoryConfig = {
  chainType?: ChainType;
  walletType: WalletType;
  signerResult: Result<providers.JsonRpcSigner, WalletConnectionError>;
};

export function mockISignerFactory(config: MockedISignerFactoryConfig): ISignerFactory {
  const factory = mock<ISignerFactory>();

  if (config.chainType) {
    when(factory.createSigner)
      .calledWith(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect.objectContaining({ walletType: config.walletType, chainType: config.chainType }),
      )
      .mockResolvedValue(config.signerResult);
  } else {
    when(factory.createSigner)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .calledWith(expect.objectContaining({ walletType: config.walletType }))
      .mockResolvedValue(config.signerResult);
  }

  return factory;
}

export function mockUnsignedLensProtocolCall<T extends TransactionRequestModel>({
  typedData,
  request,
}: {
  typedData: TypedData;
  request: T;
}) {
  return new UnsignedLensProtocolCall(faker.datatype.uuid(), request, typedData);
}

class MockedUnsignedTransactionRequest<T extends TransactionRequestModel>
  extends UnsignedTransaction<T>
  implements ITransactionRequest
{
  constructor(chainType: ChainType, request: T, readonly transactionRequest: TransactionRequest) {
    super(faker.datatype.uuid(), chainType, request);
  }
}

export function mockUnsignedTransactionRequest({
  chainType,
  txRequest,
}: {
  chainType: ChainType;
  txRequest: TransactionRequest;
}) {
  return new MockedUnsignedTransactionRequest(chainType, mockTransactionRequestModel(), txRequest);
}

export function mockExternalWallet() {
  return ExternalWallet.create(
    { address: mockEthereumAddress(), type: WalletType.UNSPECIFIED },
    mock<ISignerFactory>(),
    mock<ITransactionFactory<TransactionRequestModel>>(),
  );
}

class ErrorWithCode<T extends number | string> extends Error {
  name = 'ErrorWithCode' as const;

  constructor(readonly code: T) {
    super();
  }
}

export function mockErrorWithCode<T extends number | string>(code: T) {
  return new ErrorWithCode(code);
}
