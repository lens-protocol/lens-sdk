import { ContentInsightType } from '../../../../../lens';
import {
  mockSnapshotPollUrl,
  mockSnapshotProposalId,
  mockSnapshotSpaceId,
} from '../../../../../mocks';
import { snapshotPoll, demoSnapshotPoll } from '../matchers';

const spaceId = mockSnapshotSpaceId();
const proposalId = mockSnapshotProposalId();

describe(`Given the content insights matchers`, () => {
  describe.each([
    {
      matcher: snapshotPoll,
      snapshotUrl: 'https://snapshot.org',
    },
    {
      matcher: demoSnapshotPoll,
      snapshotUrl: 'https://demo.snapshot.org',
    },
  ])(`when testing the "$matcher.name" matcher`, ({ matcher, snapshotUrl }) => {
    const url = mockSnapshotPollUrl({
      baseUrl: snapshotUrl,
      spaceId,
      proposalId,
    });

    it('should recognize compatible snapshot URLs and return the extracted content insights', () => {
      const result = matcher(url);

      expect(result).toEqual({
        type: ContentInsightType.SNAPSHOT_POLL,
        spaceId,
        proposalId,
        url,
      });
    });

    it('should return null in case of unmatched URLs', () => {
      const url = 'https://www.example.com';

      const result = matcher(url);

      expect(result).toBe(null);
    });
  });
});
