import { LoginError, WalletLoginResult } from '@lens-protocol/domain/use-cases/wallets';
import { Result } from '@lens-protocol/shared-kernel';
import { Signer } from 'ethers';

import { Operation, useOperation } from '../helpers/operations';
import { useWalletLoginController } from './adapters/useWalletLoginController';

export type UseWalletLoginArgs = {
  address: string;
  handle?: string;
};

export type WalletLoginOperation = Operation<
  WalletLoginResult,
  LoginError,
  [Signer, string?] | [UseWalletLoginArgs]
>;

/**
 * @category Wallet
 * @group Hooks
 */
export function useWalletLogin(): WalletLoginOperation {
  const loginWallet = useWalletLoginController();

  return useOperation(
    async (
      walletLoginArgs: Signer | UseWalletLoginArgs,
      handle?: string,
    ): Promise<Result<WalletLoginResult, LoginError>> => {
      if ('address' in walletLoginArgs) {
        return loginWallet({
          address: walletLoginArgs.address,
          handle,
        });
      }
      return loginWallet({
        address: await walletLoginArgs.getAddress(),
        handle,
      });
    },
  );
}
