import { TransactionRequest } from '@ethersproject/providers';
import { faker } from '@faker-js/faker';
import {
  TransactionRequestModel,
  UnsignedTransaction,
  WalletConnectionError,
  WalletType,
} from '@lens-protocol/domain/entities';
import { mockTransactionRequestModel } from '@lens-protocol/domain/mocks';
import { ChainType, EthereumAddress, Result } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { ITransactionFactory } from '../../../transactions/adapters/ITransactionFactory';
import { TypedData } from '../../../transactions/adapters/TypedData';
import {
  ConcreteWallet,
  ISignerFactory,
  ITransactionRequest,
  UnsignedLensProtocolCall,
} from '../ConcreteWallet';
import { Credentials } from '../Credentials';
import { IProviderFactory } from '../IProviderFactory';

type MockedISignerFactoryConfig = {
  address: EthereumAddress;
  chainType?: ChainType;
  signerResult: Result<providers.JsonRpcSigner, WalletConnectionError>;
};

export function mockISignerFactory(config: MockedISignerFactoryConfig): ISignerFactory {
  const factory = mock<ISignerFactory>();

  if (config.chainType) {
    when(factory.createSigner)
      .calledWith(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect.objectContaining({ address: config.address, chainType: config.chainType }),
      )
      .mockResolvedValue(config.signerResult);
  } else {
    when(factory.createSigner)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .calledWith(expect.objectContaining({ address: config.address }))
      .mockResolvedValue(config.signerResult);
  }

  return factory;
}

type MockedIProviderFactoryConfig = {
  chainType: ChainType;
  provider: providers.JsonRpcProvider;
};

export function mockIProviderFactory({
  chainType,
  provider,
}: MockedIProviderFactoryConfig): IProviderFactory {
  const factory = mock<IProviderFactory>();

  when(factory.createProvider)
    .calledWith(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect.objectContaining({ chainType }),
    )
    .mockResolvedValue(provider);

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

export function mockConcreteWallet() {
  return ConcreteWallet.create(
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

export function mockCredentials(): Credentials {
  return new Credentials(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2Mzc3NTQ2ODEsImV4cCI6MTYzNzc1NDc0MX0.Be1eGBvVuFL4fj4pHHqc0yWDledsgS2GP3Jgonmy-xw',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2Mzc3NTQ2ODEsImV4cCI6MTYzNzc1NDc0MX0.Be1eGBvVuFL4fj4pHHqc0yWDledsgS2GP3Jgonmy-xw',
  );
}
