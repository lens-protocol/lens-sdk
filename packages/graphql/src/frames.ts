import type { FragmentOf } from 'gql.tada';
import { type RequestOf, graphql } from './graphql';

const EIP712TypedDataDomainFragment = graphql(
  `fragment EIP712TypedDataDomain on EIP712TypedDataDomain {
    name
    chain_id
    version
    verifying_contract
  }`
);

export const CreateFrameEip712TypedDataFragment = graphql(
  `fragment CreateFrameEip712TypedData on CreateFrameEIP712TypedData {
    types {
      FrameData {
        name
        type
      }
    }
    domain {
      ...EIP712TypedDataDomain
    }
    value {
      specVersion
      url
      buttonIndex
      account
      post
      inputText
      state
      transactionId
      app
      deadline
    }
  }`,
  [EIP712TypedDataDomainFragment]
);
export type CreateFrameEip712TypedDataFragment = FragmentOf<typeof CreateFrameEip712TypedDataFragment>;

export const CreateFrameTypedDataQuery = graphql(
  `query CreateFrameTypedData($request: FrameEIP712Request!) {
    value: createFrameTypedData(request: $request) {
      ...CreateFrameEip712TypedData
    }
  }`,
  [CreateFrameEip712TypedDataFragment]
);
export type CreateFrameTypedDataRequest = RequestOf<typeof CreateFrameTypedDataQuery>;

export const VerifyFrameSignatureQuery = graphql(
  `query VerifyFrameSignature($request: FrameVerifySignature!) {
    value: verifyFrameSignature(request: $request)
  }`
);
export type VerifyFrameSignatureRequest = RequestOf<typeof VerifyFrameSignatureQuery>;

export const FrameLensManagerSignatureResultFragment = graphql(
  `fragment FrameLensManagerSignatureResult on FrameLensManagerSignatureResult {
    signedTypedData {
      ...CreateFrameEip712TypedData
    }
    signature
  }`,
  [CreateFrameEip712TypedDataFragment]
);
export type FrameLensManagerSignatureResultFragment = FragmentOf<typeof FrameLensManagerSignatureResultFragment>;

export const SignFrameActionMutation = graphql(
  `mutation SignFrameAction($request: FrameLensManagerEIP712Request!) {
    value: signFrameAction(request: $request) {
      ...FrameLensManagerSignatureResult
    }
  }`,
  [FrameLensManagerSignatureResultFragment]
);
export type SignFrameActionRequest = RequestOf<typeof SignFrameActionMutation>;
