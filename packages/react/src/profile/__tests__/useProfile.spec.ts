import { MockedResponse } from '@apollo/client/testing';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeProfileIdentifierVar } from '../adapters/ActiveProfilePresenter';
import { useProfile, UseProfileArgs } from '../useProfile';

const sources = mockSources();

function setupTestScenario({
  expectations,
  ...args
}: UseProfileArgs & { expectations: MockedResponse<unknown> }) {
  return renderHookWithMocks(() => useProfile(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([expectations]),
    },
  });
}

describe(`Given the ${useProfile.name} hook`, () => {
  const profile = mockProfileFragment();

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
        description: 'when invoked with a profile id',
        args: { profileId: profile.id },
      },
      {
        description: 'when invoked with a profile handle',
        args: { handle: profile.handle },
      },
    ])('$description', ({ args }) => {
      beforeAll(() => {
        activeProfileIdentifierVar(activeProfileValue);
      });

      it('should settle with the profile data', async () => {
        const expectations = mockGetProfileQueryMockedResponse({
          profile,
          variables: {
            request: args,
            observerId: activeProfileValue?.id ?? null,
            sources,
          },
        });
        const { result } = setupTestScenario({ ...args, expectations });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profile);
      });

      it('should allow to specify the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();

        const expectations = mockGetProfileQueryMockedResponse({
          profile,
          variables: {
            request: args,
            observerId: observerId,
            sources,
          },
        });

        const { result } = setupTestScenario({ ...args, observerId, expectations });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profile);
      });

      it(`should settle with a ${NotFoundError.name} if not found`, async () => {
        const expectations = mockGetProfileQueryMockedResponse({
          profile: null,
          variables: {
            request: args,
            observerId: activeProfileValue?.id ?? null,
            sources,
          },
        });
        const { result } = setupTestScenario({ ...args, expectations });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.error).toBeInstanceOf(NotFoundError);
      });
    });
  });
});
