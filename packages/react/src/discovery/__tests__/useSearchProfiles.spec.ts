import { LimitType, Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockProfileFragment,
  mockSearchProfilesResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { UseSearchProfilesArgs, useSearchProfiles } from '../useSearchProfiles';

function setupTestScenario({ result, ...args }: UseSearchProfilesArgs & { result: Profile[] }) {
  return renderHookWithMocks(() => useSearchProfiles(args), {
    mocks: {
      apolloClient: mockLensApolloClient([
        mockSearchProfilesResponse({
          variables: {
            ...args,
            limit: LimitType.Ten,
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const query = 'query_test';
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ id }) => ({ __typename: 'Profile', id }));

  describe('when the query returns data successfully', () => {
    it('should return profiles that match the search criteria', async () => {
      const { result } = setupTestScenario({ query, result: profiles });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
