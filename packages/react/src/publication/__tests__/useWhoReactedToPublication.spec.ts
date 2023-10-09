import {
  mockProfileWhoReactedResultFragment,
  mockWhoReactedToPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import {
  UseWhoReactedToPublicationArgs,
  useWhoReactedToPublication,
} from '../useWhoReactedToPublication';

describe(`Given the ${useWhoReactedToPublication.name} hook`, () => {
  const publicationId = mockPublicationId();
  const profileReactions = [mockProfileWhoReactedResultFragment()];
  const expectations = profileReactions.map(({ profile, reactions }) => ({
    profile: {
      id: profile.id,
    },
    reactions,
  }));

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const args: UseWhoReactedToPublicationArgs = {
        for: publicationId,
      };

      const { renderHook } = setupHookTestScenario([
        mockWhoReactedToPublicationResponse({
          variables: args,
          items: profileReactions,
        }),
      ]);

      const { result } = renderHook(() => useWhoReactedToPublication(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
