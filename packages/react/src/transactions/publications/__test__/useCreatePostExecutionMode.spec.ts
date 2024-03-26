import { ModuleType } from '@lens-protocol/api-bindings';
import {
  mockModuleMetadataResponse,
  mockModuleMetadataResultFragment,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockUnknownOpenActionConfig,
  mockUnknownReferencePolicyConfig,
} from '@lens-protocol/domain/mocks';
import { act } from '@testing-library/react';

import { setupHookTestScenario } from '../../../__helpers__/setupHookTestScenario';
import { useCreatePostExecutionMode } from '../useCreatePostExecutionMode';

describe(`Given the ${useCreatePostExecutionMode.name} hook`, () => {
  const author = mockProfileFragment({
    sponsor: true,
    signless: true,
  });
  const unknownOpenActionConfig = mockUnknownOpenActionConfig();
  const unknownReferencePolicyConfig = mockUnknownReferencePolicyConfig();

  describe('when executed with sponsored=false', () => {
    it('should return a sponsored=false, signless=false', async () => {
      const { renderHook } = setupHookTestScenario([
        /* empty */
      ]);

      const { result } = renderHook(useCreatePostExecutionMode);

      await act(async () => {
        const request = await result.current({
          actions: undefined,
          author,
          reference: undefined,
          sponsored: false,
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });

  describe('when executed while the global "sponsored" flag is false', () => {
    it('should return a sponsored=false, signless=false', async () => {
      const { renderHook } = setupHookTestScenario(
        [
          /* empty */
        ],
        { sponsored: false },
      );

      const { result } = renderHook(useCreatePostExecutionMode);

      await act(async () => {
        const request = await result.current({
          actions: undefined,
          author,
          reference: undefined,
          sponsored: false,
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });

  describe('when executed with an Unknown Open Action configuration', () => {
    it('should take into account the corresponding module metadata', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: unknownOpenActionConfig.address,
          result: mockModuleMetadataResultFragment({
            signlessApproved: false,
            sponsoredApproved: false,
            moduleType: ModuleType.OpenAction,
          }),
        }),
      ]);

      const { result } = renderHook(useCreatePostExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          actions: [unknownOpenActionConfig],
          reference: undefined,
          sponsored: true,
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });

  describe('when executed with an Unknown Reference Policy configuration', () => {
    it('should take into account the corresponding module metadata', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: unknownReferencePolicyConfig.address,
          result: mockModuleMetadataResultFragment({
            signlessApproved: false,
            sponsoredApproved: false,
            moduleType: ModuleType.OpenAction,
          }),
        }),
      ]);

      const { result } = renderHook(useCreatePostExecutionMode);

      await act(async () => {
        const request = await result.current({
          actions: undefined,
          author,
          reference: unknownReferencePolicyConfig,
          sponsored: true,
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });
});
