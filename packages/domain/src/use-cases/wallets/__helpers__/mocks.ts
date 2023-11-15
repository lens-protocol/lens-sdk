import { Amount, Erc20, EvmAddress, Result } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Wallet, AnyTransactionRequestModel, UnsignedTransaction } from '../../../entities';
import { IPaidTransactionGateway } from '../../transactions/PaidTransaction';
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

export function mockTokeAvailability({
  request = expect.any(Object),
  result,
}: {
  request?: TokenAvailabilityRequest;
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
}): IPaidTransactionGateway<T> {
  const gateway = mock<IPaidTransactionGateway<T>>();

  when(gateway.createUnsignedTransaction)
    .calledWith(request, wallet)
    .mockResolvedValue(unsignedTransaction);

  return gateway;
}
