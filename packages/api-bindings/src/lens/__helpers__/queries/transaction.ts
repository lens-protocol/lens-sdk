import { MockedResponse } from '@apollo/client/testing';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import {
  LensTransactionStatusData,
  LensTransactionStatusRequest,
  LensTransactionStatusDocument,
  LensTransactionResult,
  LensTransactionStatusType,
} from '../../graphql/generated';

export function mockLensTransactionStatusDataResponse({
  request,
  result,
}: {
  request: LensTransactionStatusRequest;
  result: LensTransactionResult | null;
}): MockedResponse<LensTransactionStatusData> {
  return {
    request: {
      query: LensTransactionStatusDocument,
      variables: { request },
    },
    result: {
      data: { result },
    },
  };
}

export function mockLensTransactionResult(
  overrides?: Partial<LensTransactionResult>,
): LensTransactionResult {
  return {
    extraInfo: null,
    reason: null,
    status: LensTransactionStatusType.Processing,
    txHash: mockTransactionHash(),
    ...overrides,
    __typename: 'LensTransactionResult',
  };
}
