import { Profile } from '@lens-protocol/api-bindings';
import { mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import { mockUpdateProfileDetailsRequest, mockTransactionData } from '@lens-protocol/domain/mocks';

import { mockIProfileCacheManager } from '../../__helpers__/mocks';
import { UpdateProfileMetadataResponder } from '../UpdateProfileMetadataResponder';

function setupUpdateProfileMetadataResponder({ profile }: { profile: Profile }) {
  const profileCacheManager = mockIProfileCacheManager(profile);
  const responder = new UpdateProfileMetadataResponder(profileCacheManager);

  return { profileCacheManager, responder };
}

describe(`Given the ${UpdateProfileMetadataResponder.name}`, () => {
  const profile = mockProfileFragment();
  const request = mockUpdateProfileDetailsRequest({
    profileId: profile.id,
    attributes: {
      foo: 42,
      dob: new Date(0),
      label: 'bar',
    },
  });
  const transactionData = mockTransactionData({ request });

  describe(`when "${UpdateProfileMetadataResponder.prototype.prepare.name}" method is invoked with PendingTransactionData<UpdateProfileDetailsRequest>`, () => {
    it(`should update the correct Profile in the Apollo Cache`, async () => {
      const { responder, profileCacheManager } = setupUpdateProfileMetadataResponder({ profile });

      await responder.prepare(transactionData);

      expect(profileCacheManager.latestProfile).toMatchObject({
        name: request.name,
        bio: request.bio,
        __attributes: [
          {
            __typename: 'Attribute',
            key: 'foo',
            value: '42',
            displayType: 'number',
          },
          {
            __typename: 'Attribute',
            key: 'dob',
            value: new Date(0).toISOString(),
            displayType: 'date',
          },
          {
            __typename: 'Attribute',
            key: 'label',
            value: 'bar',
            displayType: 'string',
          },
        ],
      });
    });
  });

  describe(`when "${UpdateProfileMetadataResponder.prototype.rollback.name}" method is invoked with TransactionData<UpdateProfileDetailsRequest>`, () => {
    it(`should revert the previous changes to the correct Profile in the Apollo Cache`, async () => {
      const { responder, profileCacheManager } = setupUpdateProfileMetadataResponder({ profile });

      await responder.prepare(transactionData);
      await responder.rollback(transactionData);

      expect(profileCacheManager.latestProfile).toMatchObject(profile);
    });
  });

  describe(`when "${UpdateProfileMetadataResponder.prototype.commit.name}" method is invoked with BroadcastedTransactionData<UpdateProfileDetailsRequest>`, () => {
    const transactionData = mockTransactionData({ request });

    it(`should confirm the cache changes on the correct Profile with fresh data from the server`, async () => {
      const { responder, profileCacheManager } = setupUpdateProfileMetadataResponder({ profile });

      await responder.prepare(transactionData);
      await responder.commit(transactionData);

      expect(profileCacheManager.refreshProfile).toHaveBeenCalledWith(profile.id);
    });

    it('should clear any previous profile snapshot for the given request', async () => {
      const { responder, profileCacheManager } = setupUpdateProfileMetadataResponder({ profile });

      await responder.prepare(transactionData);
      await responder.commit(transactionData);

      // although it's not a real use case to call "rollback" after "commit", to prove
      // the responder is clearing its internal state correctly, we test it here.
      await responder.rollback(transactionData);

      expect(profileCacheManager.updateProfile).toBeCalledTimes(1);
    });
  });
});
