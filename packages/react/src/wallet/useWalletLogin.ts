import { Profile } from '@lens-protocol/api-bindings';
import { LoginError } from '@lens-protocol/domain/use-cases/wallets';
import { Result } from '@lens-protocol/shared-kernel';
import { Signer } from 'ethers';

import { Operation, useOperation } from '../helpers/operations';
import { useWalletLoginController } from './adapters/useWalletLoginController';

export type UseWalletLoginArgs = {
  /**
   * The address of the wallet to login with.
   * This will be used to retrieve the correct signer via the `{@link LensConfig#bindings}` provided.
   */
  address: string;
  /**
   * The Profile handle to use as Active Profile once logged-in.
   * If the wallet owns more than one profile, the handle can be used to select the profile to use.
   */
  handle?: string;
};

export type WalletLoginResult = Profile | null;

export type { LoginError };

export type WalletLoginOperation = Operation<
  WalletLoginResult,
  LoginError,
  [Signer, string?] | [UseWalletLoginArgs]
>;

/**
 * `useWalletLogin` is a React Hook that allows you to login with a wallet.
 *
 * Works in conjunction with the `<LensProvider>` component and the `{@link LensConfig#bindings}` config.
 *
 * @category Wallet
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { EthereumAddress, useWalletLogin } from '@lens-protocol/react-web';
 *
 * function LoginButton({ address }: { address: EthereumAddress }) {
 *   const { execute, isPending } = useWalletLogin();
 *
 *   const login = async () => {
 *     const result = await execute({ address });
 *
 *     if (result.isSuccess()) {
 *       alert(
 *         result.value !== null
 *           ? `Welcome ${result.value.handle}`
 *           : 'Welcome!'
 *       );
 *     } else {
 *       alert(result.error.message);
 *     }
 *   };
 *
 *   return (
 *     <button disabled={isPending} onClick={login}>Login</button>
 *   );
 * }
 * ```
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
          handle: walletLoginArgs.handle,
        });
      }
      return loginWallet({
        address: await walletLoginArgs.getAddress(),
        handle,
      });
    },
  );
}
