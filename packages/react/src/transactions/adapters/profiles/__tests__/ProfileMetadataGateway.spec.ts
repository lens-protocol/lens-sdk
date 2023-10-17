import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Profile } from '@lens-protocol/api-bindings';
import {
  mockCreateSetProfileMetadataTypedDataData,
  mockCreateSetProfileMetadataTypedDataResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockProfileResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockNonce, mockSetProfileMetadataRequest } from '@lens-protocol/domain/mocks';

import { UnsignedProtocolCall } from '../../../../wallet/adapters/ConcreteWallet';
import {
  assertUnsignedProtocolCallCorrectness,
  mockITransactionFactory,
} from '../../__helpers__/mocks';
import { ProfileMetadataGateway } from '../ProfileMetadataGateway';

function setupTestScenario({
  existingProfile,
  otherMockedResponses = [],
}: {
  existingProfile: Profile;
  otherMockedResponses?: MockedResponse<unknown>[];
}) {
  const getProfilesByIdQueryMockedResponse = mockProfileResponse({
    variables: {
      request: { forProfileId: existingProfile.id },
    },
    result: existingProfile,
  });

  const apolloClient = mockLensApolloClient([
    getProfilesByIdQueryMockedResponse,
    ...otherMockedResponses,
  ]);

  const transactionFactory = mockITransactionFactory();

  const gateway = new ProfileMetadataGateway(apolloClient, transactionFactory);

  return { gateway };
}

const uploadUrl = faker.internet.url();

describe(`Given an instance of the ${ProfileMetadataGateway.name}`, () => {
  const existingProfile = mockProfileFragment();
  const request = mockSetProfileMetadataRequest({
    metadataURI: uploadUrl,
  });

  describe(`when creating an IUnsignedProtocolCall<SetProfileMetadataRequest> via the "${ProfileMetadataGateway.prototype.createUnsignedProtocolCall.name}" method`, () => {
    const data = mockCreateSetProfileMetadataTypedDataData({ metadataURI: uploadUrl });

    it(`should:
        - create a new Profile Metadata updating the profile details
        - upload it via the IMetadataUploader<ProfileMetadata>
        - create an instance of the ${UnsignedProtocolCall.name} w/ the expected typed data`, async () => {
      const { gateway } = setupTestScenario({
        existingProfile,
        otherMockedResponses: [
          mockCreateSetProfileMetadataTypedDataResponse({
            request: {
              metadataURI: uploadUrl,
            },
            data,
          }),
        ],
      });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request);

      assertUnsignedProtocolCallCorrectness(unsignedCall, data.result);
    });

    it(`should override the signature nonce when provided`, async () => {
      const nonce = mockNonce();
      const { gateway } = setupTestScenario({
        existingProfile,
        otherMockedResponses: [
          mockCreateSetProfileMetadataTypedDataResponse({
            request: {
              metadataURI: uploadUrl,
            },
            overrideSigNonce: nonce,
          }),
        ],
      });

      const unsignedCall = await gateway.createUnsignedProtocolCall(request, nonce);

      expect(unsignedCall.nonce).toEqual(nonce);
    });
  });
});
