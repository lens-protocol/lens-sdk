import { Profile } from '@lens-protocol/api-bindings';
import { LoginError, LoginRequest } from '@lens-protocol/domain/use-cases/authentication';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useLoginController } from './adapters/useLoginController';

export type { LoginError, LoginRequest };

/**
 * `useLogin` is React Hook that allows you to login with the Lens API.
 *
 * To login with a Lens Profile you need to provide the Profile Id and an EVM address.
 *
 * The address can be:
 * - the EOA owner address
 * - an authorized Profile Manager address for the given Profile
 * - an EIP-1227 compliant smart wallet address (owner or authorized Profile Manager of the given Profile)
 *
 * Optionally you can login just with an EVM address. In this case the authenticated session
 * returned by {@link useSession} will be of type {@link SessionType.JustWallet} type and will not
 * contain any Profile information. The credentials associated with this session are limited to:
 * - claim a Profile with new Handle via the {@link useClaimHandle} hook
 * - collect a publication via the {@link useOpenAction} hook
 *
 * See the respective hooks documentation for more information.
 *
 * @example
 * ```tsx
 * const { execute, loading, data, error } = useLogin();
 * ```
 *
 * ## Login with a profile Id
 *
 * ```tsx
 * const { execute, loading, data, error } = useLogin();
 *
 * const address = ...
 *
 * const login = (profileId: ProfileId) => {
 *   execute({
 *     address: address,
 *     profileId: profileId,
 *   });
 * };
 *
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (error) {
 *   return <div>Error: {error.message}</div>;
 * }
 *
 * if (data) {
 *   return <div>Logged in as {data.profile.id}</div>;
 * }
 * ```
 *
 * ## Login with a profile handle
 *
 * Combine with `useLazyProfile` to login with Profile handle
 * ```tsx
 * const { execute: fetchProfile } = useLazyProfile();
 * const { execute: login, loading, data, error } = useLogin();
 *
 * const address = ...
 *
 * const login = async (handle: string) => {
 *   const profileResult = await fetchProfile({ forHandle: handle });
 *
 *   if (profileResult.isFailure()) {
 *     toast.error(profileResult.error.message);
 *     return;
 *   }
 *
 *   const profile = profileResult.value;
 *
 *   const loginResult = execute({
 *     address: address,
 *     profileId: profile.id,
 *   });
 *
 *   if (loginResult.isFailure()) {
 *     toast.error(loginResult.error.message);
 *     return;
 *   }
 *
 *   // continue with successful login flow for example use
 *   // your routing library to redirect the user somewhere.
 * };
 *
 * // continue as before
 * ```
 *
 * ## Login with just an EVM address
 *
 * ```tsx
 * const { execute, loading, data, error } = useLogin();
 *
 * const login = (address: string) => {
 *   const result = await execute({ address })
 *
 *
 * ```
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` object.
 *
 * ```tsx
 * const { execute, loading, data, error } = useLogin();
 *
 * const login = (profileId: ProfileId) => {
 *   const result = await execute({
 *     address: address,
 *     profileId: profileId,
 *   });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'PendingSigningRequestError':
 *         console.log(
 *           'There is a pending signing request in your wallet. ' +
 *             'Approve it or discard it and try again.'
 *         );
 *         break;
 *
 *       case 'WalletConnectionError':
 *         console.log('There was an error connecting to your wallet', error.message);
 *         break;
 *
 *       case 'UserRejectedError':
 *         // the user decided to not sign, usually this is silently ignored by UIs
 *         break;
 *     }
 *     return;
 *   }
 *
 *   // ...
 * };
 * ```
 *
 * @category Authentication
 * @group Hooks
 */
export function useLogin(): UseDeferredTask<Profile | null, LoginError, LoginRequest> {
  const login = useLoginController();
  return useDeferredTask(login);
}
