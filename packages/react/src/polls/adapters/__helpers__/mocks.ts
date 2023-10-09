import { TypedData } from '@lens-protocol/blockchain-bindings';
import { mockPollId } from '@lens-protocol/domain/mocks';

import { UnsignedVote } from '../SnapshotVoteFactory';

export function mockUnsignedVote({ typedData }: { typedData: TypedData }): UnsignedVote {
  return new UnsignedVote(mockPollId(), typedData);
}
