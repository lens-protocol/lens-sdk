import { ModuleType } from '@lens-protocol/api-bindings';
import {
  mockModuleMetadataResponse,
  mockModuleMetadataResultFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { OpenActionType } from '@lens-protocol/domain/use-cases/publications';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { act } from '@testing-library/react';

import { setupHookTestScenario } from '../../../__helpers__/setupHookTestScenario';
import { data } from '../../../utils';
import { useCreatePostRequest } from '../useCreatePostRequest';

const openActionModuleAddress = mockEvmAddress();

describe(`Given the ${useCreatePostRequest.name} hook`, () => {
  describe('when creating a CreatePostRequest with Unknown Open Actions', () => {
    const desired = mockCreatePostRequest({
      actions: [
        {
          type: OpenActionType.UNKNOWN_OPEN_ACTION,
          address: openActionModuleAddress,
          data: data('0x'),
        },
      ],
      signless: true,
      sponsored: true,
    });

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

      const { result } = renderHook(useCreatePostRequest);

      await act(async () => {
        const request = await result.current(desired);
        expect(request).toMatchObject({
          ...desired,
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

      const { result } = renderHook(useCreatePostRequest);

      await act(async () => {
        const request = await result.current(desired);
        expect(request).toMatchObject({
          ...desired,
          signless: false,
          sponsored: false,
        });
      });
    });
  });
});
