import { PollPublication, useGetSnapshotProposal } from '@lens-protocol/api-bindings';

import { useSnapshotApolloClient } from '../helpers/arguments';

export function usePollDetails({ contentInsight }: PollPublication) {
  return useGetSnapshotProposal(
    useSnapshotApolloClient({ variables: { id: contentInsight.proposalId } }),
  );
}
