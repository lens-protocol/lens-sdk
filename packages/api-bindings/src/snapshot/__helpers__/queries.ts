import { MockedResponse } from '@apollo/client/testing';

import {
  GetSnapshotProposalData,
  GetSnapshotProposalDocument,
  SnapshotProposal,
} from '../generated';

export function createGetSnapshotProposalDataMockedResponse({
  proposal,
}: {
  proposal: SnapshotProposal;
}): MockedResponse<GetSnapshotProposalData> {
  return {
    request: {
      query: GetSnapshotProposalDocument,
      variables: {
        proposalId: proposal.id,
        spaceId: proposal.space?.id,
        includeVotes: false,
        voterAddress: '0x000',
      },
    },
    result: {
      data: {
        proposal,
      },
    },
  };
}
