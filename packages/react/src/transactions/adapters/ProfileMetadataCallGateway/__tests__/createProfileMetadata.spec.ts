import {
  mockAttributeFragment,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockUpdateProfileDetailsRequest } from '@lens-protocol/domain/mocks';
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
  describe(`when called with a profile data and a UpdateProfileDetailsRequest`, () => {
    it('should create profile metadata with the new details as specified in the request', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [],
      });
      const request = mockUpdateProfileDetailsRequest({ profileId: profile.id });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          name: request.name,
          bio: request.bio,
          cover_picture: request.coverPicture,
          attributes: [],
        }),
      );
    });

    it('should be able to preserve "bio" and "cover_picture" if they are not specified in the request', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [],
      });
      const request = mockUpdateProfileDetailsRequest({
        profileId: profile.id,
        bio: undefined,
        coverPicture: undefined,
      });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          bio: profile.bio,
          cover_picture:
            profile.coverPicture?.__typename === 'MediaSet'
              ? profile.coverPicture.original.url
              : never(),
        }),
      );
    });

    it('should be able to delete "bio" and "cover_picture" by passing "null" into the request', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [],
      });
      const request = mockUpdateProfileDetailsRequest({
        profileId: profile.id,
        bio: null,
        coverPicture: null,
      });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          bio: null,
          cover_picture: null,
        }),
      );
    });

    it('should create profile metadata adding attributes as specified in the request', () => {
      const profile = mockProfileFieldsFragment({
        __attributes: [],
      });
      const request = mockUpdateProfileDetailsRequest({
        profileId: profile.id,
        attributes: {
          value: 42,
          dob: new Date(0),
          text: 'something',
          result: true,
        },
      });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
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
        attributes: {
          foo: null,
          bar: null,
        },
      });

      const metadata = createProfileMetadata(profile, request);

      expect(metadata).toMatchObject(
        expectedMetadata({
          attributes: [],
        }),
      );
    });

    it('should create profile metadata preserving attributes that might already have been there', () => {
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
});
