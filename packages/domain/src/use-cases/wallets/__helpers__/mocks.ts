import { Amount, Erc20, EthereumAddress, Result } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  Wallet,
  TransactionKind,
  AnyTransactionRequestModel,
  UnsignedTransaction,
} from '../../../entities';
import { mockWallet } from '../../../entities/__helpers__/mocks';
import { WalletData } from '../../lifecycle';
import { IPayTransactionGateway } from '../../transactions/PayTransaction';
import { ActiveWallet } from '../ActiveWallet';
import {
  IApproveTransactionGateway,
  TokenAllowanceRequest,
  TokenAllowanceLimit,
  UnsignedTokenAllowanceTransaction,
} from '../TokenAllowance';
import {
  IBalanceGateway,
  ITokenGateway,
  TokenAvailability,
  TokenAvailabilityError,
  TokenAvailabilityRequest,
} from '../TokenAvailability';
import { WalletLoginRequest } from '../WalletLogin';

export function mockWalletData(override: Partial<WalletData> = {}): WalletData {
  // Currently leverages structural typing matching the type of WalletData
  // this might not hold true in the future
  return mockWallet(override);
}

export function mockActiveWallet({ wallet = mockWallet() }: { wallet?: Wallet } = {}) {
  const activeWallet = mock<ActiveWallet>();

  when(activeWallet.requireActiveWallet).mockResolvedValue(wallet);
  when(activeWallet.getActiveWallet).mockResolvedValue(wallet);

  return activeWallet;
}

export function mockIBalanceGateway<T extends Erc20>({
  wallet,
  asset,
  balance,
}: {
  wallet: Wallet;
  asset: T;
  balance: Amount<T>;
}): IBalanceGateway {
  const gateway = mock<IBalanceGateway>();

  when(gateway.getBalanceFor).calledWith(wallet, asset).mockResolvedValue(balance);

  return gateway;
}

export function mockITokenGateway<T extends Erc20>({
  owner,
  asset,
  spender,
  allowance,
}: {
  owner: Wallet;
  asset: T;
  spender: EthereumAddress;
  allowance: Amount<T>;
}): ITokenGateway {
  const gateway = mock<ITokenGateway>();

  when(gateway.getTransferAllowanceFor)
    .calledWith(asset, owner, spender)
    .mockResolvedValue(allowance);

  return gateway;
}

export function mockTokenAvailabilityRequest(
  override: Partial<TokenAvailabilityRequest> = {},
): TokenAvailabilityRequest {
  return {
    amount: mockDaiAmount(1),
    spender: mockEthereumAddress(),
    ...override,
  };
}

export function mockTokenAllowanceRequest(
  override: Partial<TokenAllowanceRequest> = {},
): TokenAllowanceRequest {
  return {
    amount: mockDaiAmount(1),
    spender: mockEthereumAddress(),
    limit: TokenAllowanceLimit.EXACT,
    ...override,
    kind: TransactionKind.APPROVE_MODULE,
  };
}

export function mockIApproveTransactionGateway({
  request,
  wallet,
  unsignedTransaction,
}: {
  request: TokenAllowanceRequest;
  wallet: Wallet;
  unsignedTransaction: UnsignedTokenAllowanceTransaction;
}): IApproveTransactionGateway {
  const gateway = mock<IApproveTransactionGateway>();

  when(gateway.createApproveTransaction)
    .calledWith(request, wallet)
    .mockResolvedValue(unsignedTransaction);

  return gateway;
}

export function mockTokeAvailability({
  request,
  result,
}: {
  request: TokenAvailabilityRequest;
  result: Result<void, TokenAvailabilityError>;
}): TokenAvailability {
  const tokenAvailability = mock<TokenAvailability>();

  when(tokenAvailability.checkAvailability).calledWith(request).mockResolvedValue(result);

  return tokenAvailability;
}

export function mockWalletLoginRequest(
  overrides?: Partial<WalletLoginRequest>,
): WalletLoginRequest {
  return {
    address: mockEthereumAddress(),
    ...overrides,
  };
}

export function mockIPayTransactionGateway<T extends AnyTransactionRequestModel>({
  request,
  wallet,
  unsignedTransaction,
}: {
  request: T;
  wallet: Wallet;
  unsignedTransaction: UnsignedTransaction<T>;
}): IPayTransactionGateway<T> {
  const gateway = mock<IPayTransactionGateway<T>>();

  when(gateway.prepareSelfFundedTransaction)
    .calledWith(request, wallet)
    .mockResolvedValue(unsignedTransaction);

  return gateway;
}
