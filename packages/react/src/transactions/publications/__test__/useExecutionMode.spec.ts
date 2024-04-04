import { ModuleType } from '@lens-protocol/api-bindings';
import {
  mockModuleMetadataResponse,
  mockModuleMetadataResultFragment,
  mockPostFragment,
  mockProfileFragment,
  mockPublicationResponse,
  mockUnknownReferenceModuleSettings,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockMomokaPublicationId,
  mockPublicationId,
  mockUnknownOpenActionConfig,
  mockUnknownReferencePolicyConfig,
} from '@lens-protocol/domain/mocks';
import { act } from '@testing-library/react';

import { setupHookTestScenario } from '../../../__helpers__/setupHookTestScenario';
import { useExecutionMode } from '../useExecutionMode';

describe(`Given the ${useExecutionMode.name} hook`, () => {
  const unknownOpenActionConfig = mockUnknownOpenActionConfig();
  const unknownReferencePolicyConfig = mockUnknownReferencePolicyConfig();
  const author = mockProfileFragment({
    sponsor: true,
    signless: true,
  });

  describe('when referencing a Momoka publication', () => {
    it(`should return sponsored=true and signless according to author.signless value`, async () => {
      const referencedPublication = mockPostFragment({
        id: mockMomokaPublicationId(),
      });

      const { renderHook } = setupHookTestScenario([
        /* empty */
      ]);

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          referencedPublicationId: referencedPublication.id,
        });
        expect(request).toMatchObject({
          signless: author.signless,
          sponsored: true,
        });
      });
    });
  });

  describe.each([
    { description: 'a Momoka publication', publicationId: mockMomokaPublicationId() },
    { description: 'an on-chain publication', publicationId: mockPublicationId() },
  ])('and the referenced publication is $description', ({ publicationId }) => {
    describe('when executed with sponsored=false', () => {
      it('should return a sponsored=false, signless=false', async () => {
        const { renderHook } = setupHookTestScenario([
          /* empty */
        ]);

        const { result } = renderHook(useExecutionMode);

        await act(async () => {
          const request = await result.current({
            author,
            referencedPublicationId: publicationId,
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

        const { result } = renderHook(useExecutionMode);

        await act(async () => {
          const request = await result.current({
            author,
            referencedPublicationId: publicationId,
          });
          expect(request).toMatchObject({
            signless: false,
            sponsored: false,
          });
        });
      });
    });
  });

  describe('when the referenced publication is configured with an Unknown Reference Policy', () => {
    it('should take into account the corresponding module metadata', async () => {
      const referenceModule = mockUnknownReferenceModuleSettings({
        sponsoredApproved: false,
        signlessApproved: false,
      });
      const referencedPublication = mockPostFragment({
        referenceModule,
      });

      const { renderHook } = setupHookTestScenario([
        mockPublicationResponse({
          variables: {
            request: { forId: referencedPublication.id },
          },
          result: referencedPublication,
        }),
      ]);

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          referencedPublicationId: referencedPublication.id,
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

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          actions: [unknownOpenActionConfig],
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

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          reference: unknownReferencePolicyConfig,
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });

  describe('when executed with an unregistered Unknown Reference or Unknown Open Action module', () => {
    it('should return a sponsored=false, signless=false', async () => {
      const { renderHook } = setupHookTestScenario([
        mockModuleMetadataResponse({
          implementation: unknownReferencePolicyConfig.address,
          result: null,
        }),
      ]);

      const { result } = renderHook(useExecutionMode);

      await act(async () => {
        const request = await result.current({
          author,
          reference: unknownReferencePolicyConfig,
        });
        expect(request).toMatchObject({
          signless: false,
          sponsored: false,
        });
      });
    });
  });
});
