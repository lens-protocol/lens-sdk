import { Profile } from '@lens-protocol/api-bindings';
import { LoginError, LoginRequest } from '@lens-protocol/domain/use-cases/authentication';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useLoginController } from './adapters/useLoginController';

export type { LoginError, LoginRequest };

/**
 * `useLogin` is React Hook that allows you to login with the Lens API.
 *
 * To login you need to provide a Profile Id and an EVM address.
 *
 * The address can be:
 * - the EOA owner address
 * - an authorized Profile Manager address for the given Profile
 * - an EIP-1227 compliant smart wallet address (owner or authorized Profile Manager of the given Profile)
 *
 * @example
 * Login with a Profile Id
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
 * @example
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
 * @category Authentication
 * @group Hooks
 */
export function useLogin(): UseDeferredTask<Profile, LoginError, LoginRequest> {
  const login = useLoginController();
  return useDeferredTask(login);
}
