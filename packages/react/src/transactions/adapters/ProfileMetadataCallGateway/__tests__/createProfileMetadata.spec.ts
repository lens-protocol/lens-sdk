import {
  mockAttributeFragment,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockUpdateProfileDetailsRequest,
  mockProfileDetails,
  mockUpdateCoverImageRequest,
} from '@lens-protocol/domain/mocks';
import { never, UnknownObject } from '@lens-protocol/shared-kernel';

import { createProfileMetadata } from '../createProfileMetadata';

function expectedMetadata(others: UnknownObject) {
  return {
    version: '1.0.0',
    metadata_id: expect.any(String),

    ...others,
  };
}

describe(`Given the ${createProfileMetadata.name} helper`, () => {
  describe(`when called with a profile data and UpdateProfileDetailsRequest`, () => {
    it('should create profile metadata with the new details, preserving any cover image the profile might already have', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [],
      });
      const request = mockUpdateProfileDetailsRequest({ profileId: profile.id });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          name: request.details.name,
          bio: request.details.bio,
          cover_picture:
            profile.coverPicture?.__typename === 'MediaSet'
              ? profile.coverPicture.original.url
              : never(),
          attributes: [],
        }),
      );
    });

    it('should create profile metadata adding attributes as specified in the request', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [],
      });
      const request = mockUpdateProfileDetailsRequest({
        profileId: profile.id,
        details: mockProfileDetails({
          attributes: {
            value: 42,
            dob: new Date(0),
            text: 'something',
            result: true,
          },
        }),
      });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          name: request.details.name,
          bio: request.details.bio,
          cover_picture:
            profile.coverPicture?.__typename === 'MediaSet'
              ? profile.coverPicture.original.url
              : never(),
          attributes: [
            {
              displayType: 'number',
              key: 'value',
              value: '42',
            },
            {
              displayType: 'date',
              key: 'dob',
              value: new Date(0).toISOString(),
            },
            {
              displayType: 'string',
              key: 'text',
              value: 'something',
            },
            {
              displayType: 'boolean',
              key: 'result',
              value: 'true',
            },
          ],
        }),
      );
    });

    it('should omit attributes that are marked with "null" in the request', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [
          mockAttributeFragment({
            key: 'foo',
          }),
        ],
      });
      const request = mockUpdateProfileDetailsRequest({
        profileId: profile.id,
        details: mockProfileDetails({
          attributes: {
            foo: null,
            bar: null,
          },
        }),
      });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          name: request.details.name,
          bio: request.details.bio,
          cover_picture:
            profile.coverPicture?.__typename === 'MediaSet'
              ? profile.coverPicture.original.url
              : never(),
          attributes: [],
        }),
      );
    });

    it('should create profile metadata preserving attributes might already have', () => {
      const existingAttribute = mockAttributeFragment();
      const profile = mockProfileFieldsFragment({
        __attributes: [existingAttribute],
      });
      const request = mockUpdateProfileDetailsRequest({ profileId: profile.id });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject({
        attributes: [
          {
            key: existingAttribute.key,
            value: existingAttribute.value,
            displayType: existingAttribute.displayType,
          },
        ],
      });
    });
  });

  describe(`when called with a profile data and UpdateCoverImageRequest`, () => {
    it('should create profile metadata with the new cover image, preserving any other field', () => {
      const existingAttribute = mockAttributeFragment();
      const profile = mockProfileFieldsFragment({
        __attributes: [existingAttribute],
      });
      const request = mockUpdateCoverImageRequest({ profileId: profile.id });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          cover_picture: request.url,

          name: profile.name,
          bio: profile.bio,
          attributes: [
            {
              key: existingAttribute.key,
              value: existingAttribute.value,
              displayType: existingAttribute.displayType,
            },
          ],
        }),
      );
    });
  });
});
