import { Profile, UnspecifiedError } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { EvmAddress, PromiseResult } from '@lens-protocol/shared-kernel';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { HandleNotAvailableError, InvalidHandleError, useValidateHandle } from '../misc';
import { useCreateProfileController } from './adapters/useCreateProfileController';

/**
 * Create Profile details.
 */
export type CreateProfileArgs = {
  /**
   * The user's wallet. Could be an EOA or EIP-1271 compliant Smart Wallet (e.g. ERC-6551).
   */
  to: EvmAddress;
  /**
   * The handle local name to claim.
   */
  localName: string;
  /**
   * Determines if the Signless Experience should be enabled.
   *
   * @defaultValue true, if not specified.
   */
  approveSignless?: boolean;
};

/**
 * `useCreateProfile` is a React Hook that allows you to create a Profile associated with a Handle.
 *
 * @example
 * ```ts
 * const { execute, loading, error } = useCreateProfile();
 * ```
 *
 * ## Create a Profile
 *
 * ```ts
 * const { execute, loading, error } = useCreateProfile();
 *
 * // ...
 *
 * const result = execute({
 *   localName: 'foobar', // full handle will be lens/foobar
 *   to: '0x1234567890123456789012345678901234567890',
 * });
 *
 * if (result.isFailure()) {
 *   console.error(result.error);
 *   return;
 * }
 *
 * const profile = result.value;
 * console.log(profile);
 * ```
 *
 * @experimental This hook is experimental and may change in future versions.
 * @category Profiles
 * @group Hooks
 */
export function useCreateProfile(): UseDeferredTask<
  Profile,
  | PendingSigningRequestError
  | InsufficientGasError
  | UserRejectedError
  | WalletConnectionError
  | TransactionError
  | HandleNotAvailableError
  | InvalidHandleError
  | UnspecifiedError,
  CreateProfileArgs
> {
  const { execute: validate } = useValidateHandle();
  const createProfile = useCreateProfileController();

  return useDeferredTask(
    async (
      args: CreateProfileArgs,
    ): PromiseResult<
      Profile,
      | PendingSigningRequestError
      | InsufficientGasError
      | UserRejectedError
      | WalletConnectionError
      | TransactionError
      | HandleNotAvailableError
      | InvalidHandleError
      | UnspecifiedError
    > => {
      const result = await validate({ localName: args.localName });

      if (result.isFailure()) {
        return result;
      }

      return createProfile({
        kind: TransactionKind.CREATE_PROFILE,
        localName: args.localName,
        to: args.to,
        approveSignless: args.approveSignless ?? true,
      });
    },
  );
}
