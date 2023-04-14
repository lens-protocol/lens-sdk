import { mockCreatePostRequest, mockRequestFallback } from '@lens-protocol/domain/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertFailure, failure } from '@lens-protocol/shared-kernel';
import { act } from '@testing-library/react';

import { renderHookWithMocks } from '../../../__helpers__/testing-library';
import {
  SubsidizedTransactionHandler,
  supportsSelfFundedRetry,
  useSelfFundedTransactionFallback,
} from '../useSelfFundedTransactionFallback';

describe(`Given the ${useSelfFundedTransactionFallback.name} hook`, () => {
  describe(`when the provided handlers yields a failure(${BroadcastingError.name}) with RequestFallback`, () => {
    const request = mockCreatePostRequest();

    it(`should provide an enhanced ${BroadcastingError.name} that implements the ISelfFundedFallback interface`, async () => {
      const fn: SubsidizedTransactionHandler<CreatePostRequest, BroadcastingError> = jest
        .fn()
        .mockResolvedValue(
          failure(new BroadcastingError(BroadcastingErrorReason.REJECTED, mockRequestFallback())),
        );
      const { result } = renderHookWithMocks(() => useSelfFundedTransactionFallback(fn));

      const fallbackResult = await act(() => result.current(request));

      assertFailure(fallbackResult);
      expect(supportsSelfFundedRetry(fallbackResult.error)).toBe(true);
    });
  });
});
