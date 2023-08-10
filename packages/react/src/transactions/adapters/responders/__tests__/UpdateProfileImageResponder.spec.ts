import { faker } from '@faker-js/faker';
import { Profile } from '@lens-protocol/api-bindings';
import { mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import { mockIProfileCacheManager } from '../../__helpers__/mocks';
import { UpdateProfileImageResponder } from '../UpdateProfileImageResponder';

function setupTestScenario({ profile }: { profile: Profile }) {
  const profileCacheManager = mockIProfileCacheManager(profile);
  const responder = new UpdateProfileImageResponder(profileCacheManager);

  return { profileCacheManager, responder };
}

describe(`Given an instance of the ${UpdateProfileImageResponder.name}`, () => {
  const profile = mockProfileFragment();
  const newImageUrl = faker.image.imageUrl(600, 600, 'cat', true);

  const transactionData = mockTransactionData({
    request: mockUpdateOffChainProfileImageRequest({
      profileId: profile.id,
      url: newImageUrl,
    }),
  });

  describe(`when "${UpdateProfileImageResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should update profile picture to the latest one`, async () => {
      const { responder, profileCacheManager } = setupTestScenario({ profile });

      await responder.prepare(transactionData);

      expect(profileCacheManager.latestProfile).toMatchObject({
        ...profile,
        picture: {
          original: {
            url: newImageUrl,
          },
        },
      });
    });
  });

  describe(`when "${UpdateProfileImageResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should query server again for update profile details`, async () => {
      const { responder, profileCacheManager } = setupTestScenario({ profile });

      await responder.prepare(transactionData);
      await responder.commit(transactionData);

      expect(profileCacheManager.refreshProfile).toHaveBeenCalledWith(profile.id);
    });
  });

  describe(`when "${UpdateProfileImageResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should restore the original profile picture from the server`, async () => {
      const { responder, profileCacheManager } = setupTestScenario({ profile });

      await responder.prepare(transactionData);
      await responder.rollback(transactionData);

      expect(profileCacheManager.refreshProfile).toHaveBeenCalledWith(profile.id);
    });
  });
});
