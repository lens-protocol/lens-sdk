import {
  ContentPublication,
  isGatedPublication,
  MetadataOutput,
  UnspecifiedError,
} from '@lens-protocol/api-bindings';
import { failure, invariant, success } from '@lens-protocol/shared-kernel';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { EncryptionConfig } from '../config';
import { Operation, useOperation } from '../helpers/operations';
import { useSharedDependencies } from '../shared';
import { createGatedClient as defaultCreateGatedClient } from '../transactions/infrastructure/createGatedClient';
import { useActiveWalletSigner } from '../wallet';

export type UseEncryptedPublicationArgs<T extends ContentPublication> = {
  encryption: EncryptionConfig;
  publication: T;
};

export class DecryptionError extends Error {
  name = 'DecryptionError' as const;

  constructor(public readonly message: string) {
    super(message);
  }
}

export type UseEncryptedPublicationError = DecryptionError | UnspecifiedError;

export type UseEncryptedPublicationResult<T> = {
  data: T;
  decrypt: () => void;
  error?: UseEncryptedPublicationError;
  isPending: boolean;
};

function updateMetadata<T extends ContentPublication>(publication: T, metadata: MetadataOutput) {
  return Object.assign({}, publication, { metadata });
}

/**
 * @category Publications
 * @group Hooks
 */
export function useEncryptedPublication<T extends ContentPublication>({
  encryption,
  publication,
}: UseEncryptedPublicationArgs<T>): UseEncryptedPublicationResult<T> {
  const [shouldDecrypt, signalDecryptionIntent] = useState(false);
  const [metadata, setMetadata] = useState<MetadataOutput>(publication.metadata);

  // Although publication Metadata is to be considered immutable,
  // there are other things that can change (e.g. the publication could be deleted).
  // useMemo keeps the immutability paradigm of Apollo Normalized Cache objects so no
  // unnecessary downstream re-renderings are triggered.
  const data = useMemo(() => updateMetadata(publication, metadata), [publication, metadata]);

  const { environment, storageProvider } = useSharedDependencies();

  const { data: signer } = useActiveWalletSigner();

  const { error, execute, isPending }: Operation<void, UseEncryptedPublicationError> = useOperation(
    useCallback(async () => {
      invariant(isGatedPublication(publication), 'Publication is not gated');
      invariant(signer, `Cannot find the Active Wallet Signer`);

      if (!publication.canObserverDecrypt.result) {
        return failure(
          new DecryptionError(
            `Publication cannot be decrypted by the observer because: ${
              publication.canObserverDecrypt.reasons?.join(', ') ?? 'unknown reason(s)'
            })}. Make sure to check if canObserverDecrypt.result is true before calling decrypt().`,
          ),
        );
      }

      const createGatedClient = encryption.createGatedClient || defaultCreateGatedClient;

      const client = createGatedClient({
        config: encryption.authentication,
        signer,
        encryptionProvider: encryption.provider,
        environment,
        storageProvider,
      });

      const result = await client.decryptPublication(
        publication.metadata,
        publication.metadata.encryptionParams,
      );

      if (result.isFailure()) {
        return failure(new UnspecifiedError(result.error));
      }

      setMetadata(result.value);

      return success();
    }, [
      encryption.authentication,
      encryption.provider,
      environment,
      publication,
      signer,
      storageProvider,
      encryption.createGatedClient,
    ]),
  );

  useEffect(() => {
    if (signer && isGatedPublication(publication) && shouldDecrypt) {
      void execute();
    }
  }, [shouldDecrypt, execute, publication, signer]);

  return {
    isPending,
    decrypt: () => {
      signalDecryptionIntent(true);
    },
    error,
    data,
  };
}
