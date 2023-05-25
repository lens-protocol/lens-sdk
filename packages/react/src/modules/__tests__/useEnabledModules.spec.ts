import {
  mockLensApolloClient,
  mockEnabledModulesFragment,
  createEnabledModulesMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useEnabledModules } from '../useEnabledModules';

describe(`Given the ${useEnabledModules.name} hook`, () => {
  describe('when invoked', () => {
    it(`should return the expected list of enabled modules`, async () => {
      const enabledModules = mockEnabledModulesFragment();
      const { result } = renderHookWithMocks(() => useEnabledModules(), {
        mocks: {
          apolloClient: mockLensApolloClient([
            createEnabledModulesMockedResponse({ data: enabledModules }),
          ]),
        },
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(enabledModules);
    });
  });
});
