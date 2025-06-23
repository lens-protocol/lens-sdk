import type { FragmentOf } from 'gql.tada';
import { graphql, type RequestOf } from './graphql';

const Eip712TypedDataDomainFragment = graphql(
  `fragment Eip712TypedDataDomain on Eip712TypedDataDomain {
    __typename
    name
    chainId
    version
    verifyingContract
  }`,
);

export const CreateFrameEip712TypedDataFragment = graphql(
  `fragment CreateFrameEip712TypedData on CreateFrameEIP712TypedData {
    types {
      frameData {
        name
        type
      }
    }
    domain {
      ...Eip712TypedDataDomain
    }
    value {
      specVersion
      url
      buttonIndex
      account
      postId
      inputText
      state
      transactionId
      app
      deadline
    }
  }`,
  [Eip712TypedDataDomainFragment],
);
export type CreateFrameEip712TypedDataFragment = FragmentOf<
  typeof CreateFrameEip712TypedDataFragment
>;

export const CreateFrameTypedDataQuery = graphql(
  `query CreateFrameTypedData($request: FrameEIP712Request!) {
    value: createFrameTypedData(request: $request) {
      ...CreateFrameEip712TypedData
    }
  }`,
  [CreateFrameEip712TypedDataFragment],
);
export type CreateFrameTypedDataRequest = RequestOf<
  typeof CreateFrameTypedDataQuery
>;

export const VerifyFrameSignatureQuery = graphql(
  `query VerifyFrameSignature($request: FrameVerifySignature!) {
    value: verifyFrameSignature(request: $request)
  }`,
);
export type VerifyFrameSignatureRequest = RequestOf<
  typeof VerifyFrameSignatureQuery
>;

export const FrameLensManagerSignatureResultFragment = graphql(
  `fragment FrameLensManagerSignatureResult on FrameLensManagerSignatureResult {
    signedTypedData {
      ...CreateFrameEip712TypedData
    }
    signature
  }`,
  [CreateFrameEip712TypedDataFragment],
);
export type FrameLensManagerSignatureResultFragment = FragmentOf<
  typeof FrameLensManagerSignatureResultFragment
>;

export const SignFrameActionMutation = graphql(
  `mutation SignFrameAction($request: FrameEIP712Request!) {
    value: signFrameAction(request: $request) {
      ...FrameLensManagerSignatureResult
    }
  }`,
  [FrameLensManagerSignatureResultFragment],
);
export type SignFrameActionRequest = RequestOf<typeof SignFrameActionMutation>;
