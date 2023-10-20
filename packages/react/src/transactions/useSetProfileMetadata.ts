import { OnchainSetProfileMetadataRequest } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useSetProfileMetadataController } from './adapters/useSetProfileMetadataController';

export type UseSetProfileMetadataArgs = OnchainSetProfileMetadataRequest;

/**
 * Set a profile's metadata.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UseSetProfileMetadataArgs}
 *
 * @example
 * Update profile metadata with name and bio with location and website attributes.
 *
 * ```tsx
 * import { MetadataAttributeType, profile } from '@lens-protocol/metadata';
 * import { useSetProfileMetadata } from '@lens-protocol/react';
 * import uploadMetadataJson from './your-upload-metadata-json';
 *
 * function SetProfileMetadata() {
 *  const { execute: setMetadata, loading } = useSetProfileMetadata();
 *
 *  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
 *    event.preventDefault();
 *
 *    const formData = new FormData(event.currentTarget);
 *
 *    const name = formData.get('name') as string;
 *    const bio = formData.get('bio') as string;
 *    const location = formData.get('location') as string;
 *    const website = formData.get('website') as string;
 *
 *   const metadata = profile({
 *    name,
 *    bio,
 *    attributes: [
 *      {
 *        key: 'location',
 *        type: MetadataAttributeType.Location,
 *        value: location,
 *      },
 *      {
 *        key: 'website',
 *        type: MetadataAttributeType.Website,
 *        value: website,
 *      },
 *     ],
 *    });
 *
 *   const metadataURI = await uploadMetadataJson(metadata);
 *
 *   await setMetadata({
 *    metadataURI,
 *   });
 *  }
 *
 *  return (
 *    <form onSubmit={handleSubmit}>
 *     // render form fields
 *   </form>
 *  );
 * }
 * ```
 */
export function useSetProfileMetadata(): UseDeferredTask<
  AsyncTransactionResult<void>,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  UseSetProfileMetadataArgs
> {
  const setProfileMetadata = useSetProfileMetadataController();
  const { data: session } = useSession();

  return useDeferredTask(async ({ metadataURI }: UseSetProfileMetadataArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to set profile metadata. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to set profile metadata.',
    );

    return setProfileMetadata({
      kind: TransactionKind.UPDATE_PROFILE_DETAILS,
      delegate: session.profile.lensManager,
      metadataURI,
    });
  });
}
