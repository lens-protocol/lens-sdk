import { CollectPolicyType } from '@lens-protocol/domain/use-cases/publications';

import { CollectState } from '../../CollectPolicy';
import {
  mockNotYetKnownCollectModuleSettings,
  mockPublicationStatsFragment,
} from '../../__helpers__';
import { resolveCollectPolicy } from '../publication';

describe(`Given the ${resolveCollectPolicy.name} function'`, () => {
  describe('when called with not yet known/supported collect module', () => {
    it('should return "NO_COLLECT"', () => {
      expect(
        resolveCollectPolicy({
          collectModule: mockNotYetKnownCollectModuleSettings(),
          isAuthorFollowedByMe: false,
          publicationStats: mockPublicationStatsFragment(),
          collectNftAddress: null,
        }),
      ).toEqual({
        type: CollectPolicyType.NO_COLLECT,
        state: CollectState.CANNOT_BE_COLLECTED,
      });
    });
  });
});
