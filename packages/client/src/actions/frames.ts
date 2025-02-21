import type { ResultAsync } from '@lens-protocol/types';
import {
  CreateFrameTypedDataQuery,
  FrameVerifySignatureResult,
  SignFrameActionMutation,
  VerifyFrameSignatureQuery,
} from '@lens-protocol/graphql';
import type {
  CreateFrameEip712TypedDataFragment,
  CreateFrameTypedDataRequest,
  FrameLensManagerSignatureResultFragment,
  SignFrameActionRequest,
  VerifyFrameSignatureRequest,
} from '@lens-protocol/graphql';
import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';

export function createFrameTypedData(
  client: AnyClient,
  request: CreateFrameTypedDataRequest,
): ResultAsync<CreateFrameEip712TypedDataFragment, UnexpectedError> {
  return client.query(CreateFrameTypedDataQuery, { request });
}

export function signFrameAction(
  client: SessionClient,
  request: SignFrameActionRequest,
): ResultAsync<FrameLensManagerSignatureResultFragment, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SignFrameActionMutation, { request });
}

export function verifyFrameSignature(
  client: AnyClient,
  request: VerifyFrameSignatureRequest,
): ResultAsync<FrameVerifySignatureResult, UnexpectedError> {
  return client.query(VerifyFrameSignatureQuery, { request }).map(
    (result) => FrameVerifySignatureResult[result as keyof typeof FrameVerifySignatureResult]
  );
}
