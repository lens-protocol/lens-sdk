import { Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetProfileResponse,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { WalletConnectionError, WalletConnectionErrorReason } from '@lens-protocol/domain/entities';
import { mockProfileIdentifier } from '@lens-protocol/domain/mocks';
import { failure, success } from '@lens-protocol/shared-kernel';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../mediaTransforms';
import { ProfileCacheManager } from '../../../transactions/infrastructure/ProfileCacheManager';
import { WalletLoginPresenter } from '../WalletLoginPresenter';

type SetupTestScenarioArgs = {
  profile: Profile;
};

function setupTestScenario({ profile }: SetupTestScenarioArgs) {
  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const apolloClient = mockLensApolloClient([
    mockGetProfileResponse({
      profile,
      variables: {
        request: {
          profileId: profile.id,
        },
        observerId: null,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
    }),
  ]);

  const profileCacheManager = new ProfileCacheManager(apolloClient, sources, mediaTransforms);
  return new WalletLoginPresenter(profileCacheManager);
}

describe(`Given an instance of the ${WalletLoginPresenter.name}`, () => {
  const profile = mockProfileFragment();
  const expectations = { __typename: 'Profile', id: profile.id };

  describe(`when "${WalletLoginPresenter.prototype.present.name}" method is invoked with a ProfileIdentifier`, () => {
    it(`should resolve the "${WalletLoginPresenter.prototype.asResult.name}" promise with a success(Profile)`, async () => {
      const identifier = mockProfileIdentifier(profile);
      const presenter = setupTestScenario({ profile });

      const promise = presenter.asResult();
      void presenter.present(success(identifier));
      const result = await promise;

      expect(result.unwrap()).toMatchObject(expectations);
    });
  });

  describe(`when "${WalletLoginPresenter.prototype.present.name}" method is invoked with an error`, () => {
    it(`should resolve the "${WalletLoginPresenter.prototype.asResult.name}" promise with a failure(LoginError)`, async () => {
      const presenter = setupTestScenario({ profile });

      const promise = presenter.asResult();
      const err = new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN);
      void presenter.present(failure(err));
      const result = await promise;

      expect(() => result.unwrap()).toThrow(WalletConnectionError);
    });
  });
});
