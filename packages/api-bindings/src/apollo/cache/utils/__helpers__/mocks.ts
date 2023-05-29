import { faker } from '@faker-js/faker';
import { Url } from '@lens-protocol/shared-kernel';

import { SnapshotProposalId, SnapshotSpaceId } from '../../../../lens';

export function mockSnapshotSpaceId(): SnapshotSpaceId {
  return faker.internet.domainName() as SnapshotSpaceId;
}

export function mockSnapshotProposalId(): SnapshotProposalId {
  return faker.datatype.hexadecimal() as SnapshotProposalId;
}

export function mockSnapshotPollUrl({
  baseUrl = 'https://snapshot.org',
  spaceId = mockSnapshotSpaceId(),
  proposalId = mockSnapshotProposalId(),
}: {
  baseUrl?: Url;
  spaceId?: SnapshotSpaceId;
  proposalId?: SnapshotProposalId;
} = {}) {
  return `${baseUrl}/#/${spaceId}/proposal/${proposalId}`;
}
