import { mockProfileId } from '@lens-protocol/domain/mocks';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import { resolveReferenceModuleInput } from '../resolveReferenceModuleInput';

const profileId = mockProfileId();

describe(`Given the ${resolveReferenceModuleInput.name} function`, () => {
  describe.each([
    {
      config: { type: ReferencePolicyType.ANYONE } as const,
      expected: undefined,
    },
    {
      config: { type: ReferencePolicyType.NO_ONE } as const,
      expected: {
        degreesOfSeparationReferenceModule: {
          commentsRestricted: false,
          mirrorsRestricted: false,
          degreesOfSeparation: 0,
          quotesRestricted: false,
        },
      },
    },
    {
      config: { type: ReferencePolicyType.FOLLOWERS_ONLY } as const,
      expected: {
        followerOnlyReferenceModule: true,
      },
    },
    {
      config: {
        type: ReferencePolicyType.DEGREES_OF_SEPARATION,
        params: {
          commentsRestricted: true,
          mirrorsRestricted: true,
          degreesOfSeparation: 6,
          quotesRestricted: true,
          sourceProfileId: profileId,
        },
      } as const,
      expected: {
        degreesOfSeparationReferenceModule: {
          commentsRestricted: true,
          mirrorsRestricted: true,
          degreesOfSeparation: 6,
          quotesRestricted: true,
          sourceProfileId: profileId,
        },
      },
    },
  ])(`when called with "$config.type" reference policy`, ({ config, expected }) => {
    it(`should resolve the expected ReferenceModuleInput`, async () => {
      const input = resolveReferenceModuleInput(config);

      expect(input).toEqual(expected);
    });
  });
});
