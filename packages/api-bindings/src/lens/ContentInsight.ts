import { Brand, Url } from '@lens-protocol/shared-kernel';

export enum ContentInsightType {
  SNAPSHOT_POLL = 'SNAPSHOT_POLL',
  UNDETERMINED = 'UNDETERMINED',
}

export type SnapshotProposalId = Brand<string, 'SnapshotProposalId'>;
export type SnapshotSpaceId = Brand<string, 'SnapshotSpaceId'>;

export type SnapshotPoll = {
  type: ContentInsightType.SNAPSHOT_POLL;
  proposalId: SnapshotProposalId;
  spaceId: SnapshotSpaceId;
  url: Url;
};

export type Undetermined = {
  type: ContentInsightType.UNDETERMINED;
};

export type ContentInsight = SnapshotPoll | Undetermined;
