import { Amount, Erc20, EvmAddress, Result } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  Wallet,
  TransactionKind,
  AnyTransactionRequestModel,
  UnsignedTransaction,
} from '../../../entities';
import { IPayTransactionGateway } from '../../transactions/PayTransaction';
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
  spender: EvmAddress;
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
    spender: mockEvmAddress(),
    ...override,
  };
}

export function mockTokenAllowanceRequest(
  override: Partial<TokenAllowanceRequest> = {},
): TokenAllowanceRequest {
  return {
    amount: mockDaiAmount(1),
    spender: mockEvmAddress(),
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
