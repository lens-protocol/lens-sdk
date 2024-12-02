import type { SessionClient, SigningError, UnexpectedError } from '@lens-protocol/client';
import { AuthenticationError } from '@lens-protocol/client';
import { fetchAccount } from '@lens-protocol/client/actions';
import type { Account } from '@lens-protocol/graphql';
import { type EvmAddress, type ResultAsync, okAsync } from '@lens-protocol/types';

import { useLensContext } from '../context';
import { type UseAsyncTask, useAsyncTask } from '../helpers';
import { Login } from './use-cases/Login';

/**
 * A message signer.
 */
export type MessageSigner = {
  address: EvmAddress;
  signMessage: (message: string) => Promise<string>;
};

export type LoginArgs = {
  /**
   * The Account to login with.
   */
  account: EvmAddress;
  /**
   * The App to login into.
   *
   * ALL operations will be scoped to this App.
   *
   * Use only with App you own or with the app builder's permission.
   * App builder have the ability to refuse access to their App in case of abuse.
   */
  app: EvmAddress;
  /**
   * The signer to use to sign the SIWE message.
   *
   * It could be a signer associated with the Account itself
   * or an Account Manager for it.
   */
  signer: MessageSigner;
};

export type LoginError = AuthenticationError | SigningError | UnexpectedError;

type LoginResult = ResultAsync<Account, LoginError>;

/**
 * Login to Lens.
 *
 * ```tsx
 * const { execute } = useLogin();
 *
 * const result = await execute({
 *   account: evmAddress('0xB8d87f414EDc074A1808497BA2Fefc0fb37164C3'),
 *   app: evmAddress('0xe5439696f4057aF073c0FB2dc6e5e755392922e1'),
 *   signer: {
 *     address: evmAddress(wallet.address),
 *     signMessage: (message: string) => wallet.signMessage({ message }),
 *   },
 * });
 *
 * if (result.isOk()) {
 *   console.log(result.value); // Account
 * }
 * ```
 */
export function useLogin(): UseAsyncTask<LoginArgs, Account, LoginError> {
  const { client } = useLensContext();

  return useAsyncTask((args: LoginArgs): LoginResult => {
    const repository = (sessionClient: SessionClient): LoginResult =>
      fetchAccount(sessionClient, { address: args.account }).andThen((account) => {
        if (account === null) {
          return AuthenticationError.from(
            'Unable to retrieve the Account data you signed in with. ' +
              'Please contact the Lens team.',
          ).asResultAsync();
        }
        return okAsync(account);
      });

    const login = new Login(client, repository);

    return login.execute({
      accountOwner: {
        account: args.account,
        owner: args.signer.address,
        app: args.app,
      },
      signMessage: args.signer.signMessage.bind(args.signer),
    });
  });
}
