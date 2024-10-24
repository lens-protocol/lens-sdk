import { ResultAsync, err, never, ok, signatureFrom } from '@lens-social/types';
import type { EvmAddress, Result } from '@lens-social/types';
import type { AuthenticatedClient, Client } from '../client';
import { type AuthenticationError, SigningError, type UnexpectedError } from '../errors';

export type SignMessage = (message: string) => Promise<string>;

export type SignInParams = {
  signedBy: EvmAddress;
  app: EvmAddress;
  account: EvmAddress;
};

/**
 * Authenticates the client.
 *
 * @param client - The LensClient` to authenticate.
 * @param params - The parameters to use for authentication.
 * @param signMessage - The function to use for signing the SIWE message.
 * @returns A `Result` with the `AuthenticatedClient` instance.
 */
export const signIn = async (
  client: Client,
  params: SignInParams,
  signMessage: SignMessage,
): Promise<Result<AuthenticatedClient, AuthenticationError | SigningError | UnexpectedError>> => {
  const challenge = await client.challenge({
    request: {
      account: params.account,
      signedBy: params.signedBy,
      app: params.app,
    },
  });

  if (challenge.isErr()) {
    return err(challenge.error);
  }

  const signature = await ResultAsync.fromPromise(
    signMessage(challenge.value.text),
    SigningError.from,
  );

  if (signature.isErr()) {
    return err(signature.error);
  }

  return await client.authenticate({
    request: {
      id: challenge.value.id,
      signature: signatureFrom(signature.value),
    },
  });
};
