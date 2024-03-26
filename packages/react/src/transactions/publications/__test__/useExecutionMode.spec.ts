import { ModuleType } from '@lens-protocol/api-bindings';
import {
  mockModuleMetadataResponse,
  mockModuleMetadataResultFragment,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { act } from '@testing-library/react';

import { setupHookTestScenario } from '../../../__helpers__/setupHookTestScenario';
import { useExecutionMode } from '../useExecutionMode';

describe(`Given the ${useExecutionMode.name} hook`, () => {
  const moduleAddress = mockEvmAddress();
  const author = mockProfileFragment({
    sponsor: true,
    signless: true,
  });

  describe('when executed with a registered Unknown Module', () => {
    it('should take into account Unknown Open Action modules metadata to determine the "sponsored" and "signless" flags', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: moduleAddress,
          result: mockModuleMetadataResultFragment({
            signlessApproved: false,
            sponsoredApproved: false,
            moduleType: ModuleType.OpenAction,
          }),
        }),
      ]);

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          unknownModules: [moduleAddress],
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });

  describe('when executed with an unregistered Unknown Module', () => {
    it('should opt for non-sponsored tx', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: moduleAddress,
          result: null,
        }),
      ]);

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          unknownModules: [moduleAddress],
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });
});
