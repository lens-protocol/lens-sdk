import {
  TransactionRequestModel,
  WalletConnectionError,
  WalletType,
} from '@lens-protocol/domain/entities';
import { ChainType, Result } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { ITransactionFactory } from '../../../transactions/adapters/ITransactionFactory';
import { ExternalWallet } from '../ExternalWallet';
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

export function mockExternalWallet() {
  return ExternalWallet.create(
    { address: mockEthereumAddress(), type: WalletType.OTHER },
    mock<ISignerFactory>(),
    mock<ITransactionFactory<TransactionRequestModel>>(),
  );
}
