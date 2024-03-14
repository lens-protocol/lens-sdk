import { ModuleType } from '@lens-protocol/api-bindings';
import {
  mockModuleMetadataResponse,
  mockModuleMetadataResultFragment,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { OpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { act } from '@testing-library/react';

import { setupHookTestScenario } from '../../../__helpers__/setupHookTestScenario';
import { data } from '../../../utils';
import {
  CreatePostExecutionModeArgs,
  useCreatePostExecutionMode,
} from '../useCreatePostExecutionMode';

describe(`Given the ${useCreatePostExecutionMode.name} hook`, () => {
  describe('when evaluating a CreatePostRequest with Unknown Open Actions', () => {
    const author = mockProfileFragment({
      sponsor: true,
      signless: true,
    });
    const openActionModuleAddress = mockEvmAddress();
    const desired: CreatePostExecutionModeArgs = {
      author,
      actions: [
        {
          type: OpenActionType.UNKNOWN_OPEN_ACTION,
          address: openActionModuleAddress,
          data: data('0x'),
        },
      ],
      sponsored: true,
    };

    it('should take into account Unknown Open Action modules metadata to determine the "sponsored" and "signless" flags', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: openActionModuleAddress,
          result: mockModuleMetadataResultFragment({
            signlessApproved: false,
            sponsoredApproved: false,
            moduleType: ModuleType.OpenAction,
          }),
        }),
      ]);

      const { result } = renderHook(useCreatePostExecutionMode);

      await act(async () => {
        const request = await result.current(desired);
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });

    it('should opt for non-sponsored tx whenever the module is not registered', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: openActionModuleAddress,
          result: null,
        }),
      ]);

      const { result } = renderHook(useCreatePostExecutionMode);

      await act(async () => {
        const request = await result.current(desired);
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });
});
