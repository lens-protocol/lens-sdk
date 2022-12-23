import {
  createMockApolloClientWithMultipleResponses,
  createEnabledModuleCurrenciesQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ChainType, mockDaiAsset, mockUsdcAsset } from '@lens-protocol/shared-kernel';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useCurrencies } from '../useCurrencies';

describe(`Given the ${useCurrencies.name} hook`, () => {
  describe('when invoked', () => {
    it(`should return the expected list of Erc20`, async () => {
      const chainType = ChainType.POLYGON;
      const currencies = [mockDaiAsset({ chainType }), mockUsdcAsset({ chainType })];
      const { result } = renderHookWithMocks(() => useCurrencies(), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            createEnabledModuleCurrenciesQueryMockedResponse(currencies),
          ]),
        },
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(currencies);
    });
  });
});
