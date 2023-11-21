import {
  mockProfileFragment,
  mockWhoActedOnPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import {
  UseWhoActedOnPublicationArgs,
  useWhoActedOnPublication,
} from '../useWhoActedOnPublication';

describe(`Given the ${useWhoActedOnPublication.name} hook`, () => {
  const publicationId = mockPublicationId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockWhoActedOnPublicationResponse({
          variables: {
            on: publicationId,
          },
          items: profiles,
        }),
      ]);

      const args: UseWhoActedOnPublicationArgs = {
        on: publicationId,
      };

      const { result } = renderHook(() => useWhoActedOnPublication(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
