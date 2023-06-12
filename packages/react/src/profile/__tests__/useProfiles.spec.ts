import { activeProfileIdentifierVar, Profile } from '@lens-protocol/api-bindings';
import {
  createGetAllProfilesMockedResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
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
      apolloClient: mockLensApolloClient([
        createGetAllProfilesMockedResponse({
          variables: {
            byHandles: args.handles,
            byProfileIds: args.profileIds,
            limit: DEFAULT_PAGINATED_QUERY_LIMIT,
            sources,
            observerId: expectedObserverId ?? null,
          },
          profiles: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfiles.name} hook`, () => {
  const profiles = [mockProfileFragment()];

  beforeAll(() => {
    simulateAppReady();
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
        activeProfileIdentifierVar(activeProfileValue);
      });

      it('should return list of profiles', async () => {
        const { result } = setupTestScenario({
          ...args,
          result: profiles,
          expectedObserverId: activeProfileValue?.id,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profiles);
      });

      it('should always allow to specify the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();

        const { result } = setupTestScenario({
          ...args,
          observerId,
          result: profiles,
          expectedObserverId: observerId,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profiles);
      });
    });
  });
});
