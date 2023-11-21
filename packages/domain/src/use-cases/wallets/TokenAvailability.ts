import {
  Amount,
  Erc20,
  EvmAddress,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';

import { Wallet } from '../../entities';
import { ActiveWallet } from '../authentication/ActiveWallet';

export interface IBalanceGateway {
  getBalanceFor<T extends Erc20>(wallet: Wallet, asset: T): Promise<Amount<T>>;
}

export interface ITokenGateway {
  getTransferAllowanceFor<T extends Erc20>(
    asset: T,
    owner: Wallet,
    spender: EvmAddress,
  ): Promise<Amount<T>>;
}

export class InsufficientAllowanceError extends Error {
  name = 'InsufficientAllowanceError' as const;

  constructor(readonly requestedAmount: Amount<Erc20>) {
    super(`Insufficient allowance ${requestedAmount.toString()}`);
  }
}

export class InsufficientFundsError extends Error {
  name = 'InsufficientFundsError' as const;

  constructor(readonly requestedAmount: Amount<Erc20>) {
    super(`Insufficient funds ${requestedAmount.toString()}`);
  }
}

export type TokenAvailabilityRequest = {
  amount: Amount<Erc20>;
  spender: EvmAddress;
};

export type TokenAvailabilityError = InsufficientAllowanceError | InsufficientFundsError;

export class TokenAvailability {
  constructor(
    private readonly balanceGateway: IBalanceGateway,
    private readonly tokenGateway: ITokenGateway,
    private readonly activeWallet: ActiveWallet,
  ) {}

  async checkAvailability(
    request: TokenAvailabilityRequest,
  ): PromiseResult<void, TokenAvailabilityError> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const balance = await this.balanceGateway.getBalanceFor(wallet, request.amount.asset);

    if (request.amount.gt(balance)) {
      return failure(new InsufficientFundsError(request.amount));
    }

    const allowance = await this.tokenGateway.getTransferAllowanceFor(
      request.amount.asset,
      wallet,
      request.spender,
    );

    if (request.amount.gt(allowance)) {
      return failure(new InsufficientAllowanceError(request.amount));
    }

    return success();
  }
}
