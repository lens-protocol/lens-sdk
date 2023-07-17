import { Profile } from '@lens-protocol/api-bindings';
import {
  mockGetAllProfilesResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { useProfiles, UseProfilesArgs } from '../useProfiles';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseProfilesArgs & { result: Profile[]; expectedObserverId?: ProfileId }) {
  const sources = mockSources();

  return renderHookWithMocks(() => useProfiles(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockGetAllProfilesResponse({
          variables: {
            byHandles: args.handles,
            byProfileIds: args.profileIds,
            limit: DEFAULT_PAGINATED_QUERY_LIMIT,
            sources,
            observerId: expectedObserverId ?? null,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfiles.name} hook`, () => {
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ id }) => ({ __typename: 'Profile', id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe.each([
    {
      precondition: 'and NO Active Profile set',
      activeProfileValue: null,
    },
    {
      precondition: 'and an Active Profile set',
      activeProfileValue: mockProfile(),
    },
  ])('$precondition', ({ activeProfileValue }) => {
    describe.each([
      {
        description: 'when invoked with a list of profile IDs',
        args: { profileIds: profiles.map(({ id }) => id) },
      },
      {
        description: 'when invoked with a list of profile handles',
        args: { handles: profiles.map(({ handle }) => handle) },
      },
    ])('$description', ({ args }) => {
      beforeAll(() => {
        if (activeProfileValue) {
          simulateAuthenticatedProfile(activeProfileValue);
        }
      });

      it('should return list of profiles', async () => {
        const { result } = setupTestScenario({
          ...args,
          result: profiles,
          expectedObserverId: activeProfileValue?.id,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectations);
      });

      it('should allow to override the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();

        const { result } = setupTestScenario({
          ...args,
          observerId,
          result: profiles,
          expectedObserverId: observerId,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectations);
      });
    });
  });
});
