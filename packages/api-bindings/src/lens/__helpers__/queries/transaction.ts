import { MockedResponse } from '@apollo/client/testing';
import { mockTransactionHash } from '@lens-protocol/domain/mocks';
import { EvmAddress } from '@lens-protocol/shared-kernel';

import {
  GenerateLensApiRelayAddressDocument,
  LensTransactionResult,
  LensTransactionStatusData,
  LensTransactionStatusDocument,
  LensTransactionStatusRequest,
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

export function mockGenerateLensAPIRelayAddressResponse({ address }: { address: EvmAddress }) {
  return {
    request: {
      query: GenerateLensApiRelayAddressDocument,
    },
    result: {
      data: { result: address },
    },
  };
}
