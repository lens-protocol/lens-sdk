import { faker } from '@faker-js/faker';
import { Url } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { SnapshotProposalId, SnapshotSpaceId } from '../../lens';
import { SnapshotProposal } from '../generated';

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

export function mockSnapshotProposal(overrides?: Partial<SnapshotProposal>): SnapshotProposal {
  return {
    id: mockSnapshotProposalId(),
    author: mockEthereumAddress(),
    state: 'active',
    title: faker.lorem.sentence(),
    choices: ['yes', 'no'],
    scores: [1, 0],
    scores_total: 1,
    snapshot: '1234567890',
    symbol: 'BRA',
    privacy: '',
    network: '1',
    type: 'single-choice',
    start: faker.date.past().getTime(),
    end: faker.date.future().getTime(),
    quorum: 1,
    space: {
      id: faker.internet.domainName(),
      name: faker.commerce.productName(),
    },
    strategies: [],
    ...overrides,
    __typename: 'Proposal',
  };
}
