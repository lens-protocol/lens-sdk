import { TransactionRequest } from '@ethersproject/providers';
import { faker } from '@faker-js/faker';
import {
  TransactionRequestModel,
  UnsignedTransaction,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { mockSignature, mockTransactionRequestModel } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, EthereumAddress, Result } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { ITransactionFactory } from '../../../transactions/adapters/ITransactionFactory';
import { TypedData } from '../../../transactions/adapters/TypedData';
import { mockSelfFundedProtocolCallRequest } from '../../../transactions/adapters/__helpers__/mocks';
import {
  ConcreteWallet,
  ISignerFactory,
  ITransactionRequest,
  SignedProtocolCall,
  UnsignedProtocolCall,
} from '../ConcreteWallet';
import { Credentials } from '../Credentials';
import { IProviderFactory } from '../IProviderFactory';

type MockedISignerFactoryConfig = {
  address: EthereumAddress;
  chainType?: ChainType;
  signerResult: Result<providers.JsonRpcSigner, WalletConnectionError>;
};

export function mockISignerFactory({
  signerResult,
  ...config
}: MockedISignerFactoryConfig): ISignerFactory {
  const factory = mock<ISignerFactory>();

  when(factory.createSigner)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .calledWith(expect.objectContaining(config))
    .mockResolvedValue(signerResult);

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

export function mockUnsignedProtocolCall<T extends SupportedTransactionRequest>({
  typedData,
  request,
}: {
  typedData: TypedData;
  request: T;
}) {
  return UnsignedProtocolCall.create({
    id: faker.datatype.uuid(),
    request,
    typedData,
    fallback: mockSelfFundedProtocolCallRequest<T>(),
  });
}

export function mockSignedProtocolCall<T extends SupportedTransactionRequest>() {
  return SignedProtocolCall.create({
    unsignedCall: mockUnsignedProtocolCall({
      typedData: mock<TypedData>(),
      request: mockTransactionRequestModel() as T,
    }),
    signature: mockSignature(),
  });
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
    { address: mockEthereumAddress() },
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
