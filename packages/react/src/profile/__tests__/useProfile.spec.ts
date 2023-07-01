import { Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  createGetProfileMockedResponse,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfile, UseProfileArgs } from '../useProfile';

function setupTestScenario({
  profile,
  expectedObserverId,
  ...args
}: UseProfileArgs & { profile: Profile | null; expectedObserverId: ProfileId | null }) {
  const sources = mockSources();

  return renderHookWithMocks(() => useProfile(args), {
    mocks: {
      sources,
      apolloClient: mockLensApolloClient([
        createGetProfileMockedResponse({
          profile,
          variables: {
            request: args.profileId
              ? {
                  profileId: args.profileId,
                }
              : {
                  handle: args.handle,
                },
            observerId: expectedObserverId,
            sources,
          },
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfile.name} hook`, () => {
  const profile = mockProfileFragment();
  const expectations = { __typename: 'Profile', id: profile.id };

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
        description: 'when invoked with a profile id',
        args: { profileId: profile.id },
      },
      {
        description: 'when invoked with a profile handle',
        args: { handle: profile.handle },
      },
    ])('$description', ({ args }) => {
      beforeAll(() => {
        if (activeProfileValue) {
          simulateAuthenticatedProfile(activeProfileValue);
        }
      });

      it('should settle with the profile data', async () => {
        const { result } = setupTestScenario({
          ...args,
          profile,
          expectedObserverId: activeProfileValue?.id ?? null,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectations);
      });

      it('should allow to specify the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();

        const { result } = setupTestScenario({
          ...args,
          profile,
          observerId,
          expectedObserverId: observerId,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectations);
      });

      it(`should settle with a ${NotFoundError.name} if not found`, async () => {
        const { result } = setupTestScenario({
          ...args,
          profile: null,
          expectedObserverId: activeProfileValue?.id ?? null,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.error).toBeInstanceOf(NotFoundError);
      });
    });
  });
});
