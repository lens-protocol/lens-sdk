import { mockCreateCommentRequest, mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import { resolveReferenceModuleParams } from '../resolveReferenceModuleParams';

describe(`Given the ${resolveReferenceModuleParams.name} function`, () => {
  describe.each([
    {
      type: 'CreatePostRequest',
      mockRequest: mockCreatePostRequest,
    },
    {
      type: 'CreateCommentRequest',
      mockRequest: mockCreateCommentRequest,
    },
  ])('when called with a "$type"', ({ mockRequest }) => {
    describe(`that has ${ReferencePolicyType.ANYONE} reference policy`, () => {
      it(`should resolve with no reference module config`, async () => {
        const request = mockRequest({
          reference: { type: ReferencePolicyType.ANYONE },
        });

        const referenceModule = resolveReferenceModuleParams(request);

        expect(referenceModule).toBe(undefined);
      });
    });

    describe(`that has ${ReferencePolicyType.FOLLOWERS_ONLY} reference policy`, () => {
      it(`should resolve with the "followerOnlyReferenceModule"`, async () => {
        const request = mockRequest({
          reference: { type: ReferencePolicyType.FOLLOWERS_ONLY },
        });

        const referenceModule = resolveReferenceModuleParams(request);

        expect(referenceModule).toEqual({
          followerOnlyReferenceModule: true,
        });
      });
    });

    describe(`that has ${ReferencePolicyType.DEGREES_OF_SEPARATION} reference policy`, () => {
      it(`should resolve with the "followerOnlyReferenceModule"`, async () => {
        const params = {
          commentsRestricted: true,
          mirrorsRestricted: true,
          degreesOfSeparation: 6,
        };
        const request = mockRequest({
          reference: {
            type: ReferencePolicyType.DEGREES_OF_SEPARATION,
            params,
          },
        });

        const referenceModule = resolveReferenceModuleParams(request);

        expect(referenceModule).toEqual({
          degreesOfSeparationReferenceModule: params,
        });
      });
    });
  });
});
