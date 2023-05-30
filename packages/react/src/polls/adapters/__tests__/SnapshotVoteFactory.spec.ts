import {
  SnapshotProposal,
  SnapshotSpaceId,
  SnapshotVotingSystem,
} from '@lens-protocol/api-bindings';
import {
  createGetSnapshotProposalDataMockedResponse,
  mockSnapshotApolloClient,
  mockSnapshotProposal,
  mockSnapshotSpaceId,
} from '@lens-protocol/api-bindings/mocks';
import { AppId } from '@lens-protocol/domain/entities';
import {
  mockAppId,
  mockCreateUnsignedVoteRequest,
  mockPollId,
  mockWallet,
} from '@lens-protocol/domain/mocks';
import { InvariantError, never } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { getAddress } from 'ethers/lib/utils';

import { SnapshotVoteFactory, UnsignedVote } from '../SnapshotVoteFactory';
import { vote2Types, voteArray2Types, voteString2Types } from '../types';

function setupTestScenario({ appId, proposal }: { appId: AppId; proposal: SnapshotProposal }) {
  const client = mockSnapshotApolloClient([
    createGetSnapshotProposalDataMockedResponse({ proposal }),
  ]);

  return new SnapshotVoteFactory(client, (proposal.space?.id ?? never()) as SnapshotSpaceId, appId);
}

describe(`Given an instance of the ${SnapshotVoteFactory.name}`, () => {
  describe(`when the ${SnapshotVoteFactory.prototype.createUnsignedVote.name} method is called`, () => {
    const voter = mockWallet({
      // ensures `from` has EIP-55 checksum
      address: mockEthereumAddress().toLowerCase(),
    });
    const pollId = mockPollId();
    const spaceId = mockSnapshotSpaceId();
    const appId = mockAppId();

    it.each([
      {
        proposal: mockSnapshotProposal({
          id: pollId,
          space: { id: spaceId, name: null },
          type: SnapshotVotingSystem.SINGLE_CHOICE,
        }),
        spaceId,
        request: mockCreateUnsignedVoteRequest({ pollId, choice: 0, voter }),
        expectedTypedData: {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: vote2Types,
          message: {
            choice: 1,
            reason: '',
            proposal: pollId,
            space: spaceId,
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        },
      },
      {
        proposal: mockSnapshotProposal({
          id: pollId,
          space: { id: spaceId, name: null },
          type: SnapshotVotingSystem.BASIC,
        }),
        spaceId,
        request: mockCreateUnsignedVoteRequest({ pollId, choice: 0, voter }),
        expectedTypedData: {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: vote2Types,
          message: {
            choice: 1,
            reason: '',
            proposal: pollId,
            space: spaceId,
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        },
      },
      {
        proposal: mockSnapshotProposal({
          id: pollId,
          space: { id: spaceId, name: null },
          type: SnapshotVotingSystem.APPROVAL,
          choices: ['a', 'b', 'c'],
        }),
        request: mockCreateUnsignedVoteRequest({ pollId, choice: [0, 1], voter }),
        expectedTypedData: {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: voteArray2Types,
          message: {
            choice: [1, 2],
            reason: '',
            proposal: pollId,
            space: spaceId,
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        },
      },
      {
        proposal: mockSnapshotProposal({
          id: pollId,
          space: { id: spaceId, name: null },
          type: SnapshotVotingSystem.RANKED_CHOICE,
          choices: ['a', 'b', 'c'],
        }),
        request: mockCreateUnsignedVoteRequest({ pollId, choice: [0, 1], voter }),
        expectedTypedData: {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: voteArray2Types,
          message: {
            choice: [1, 2],
            reason: '',
            proposal: pollId,
            space: spaceId,
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        },
      },
      {
        proposal: mockSnapshotProposal({
          id: pollId,
          space: { id: spaceId, name: null },
          type: SnapshotVotingSystem.QUADRATIC,
          choices: ['a', 'b', 'c'],
        }),
        request: mockCreateUnsignedVoteRequest({ pollId, choice: [0, 1], voter }),
        expectedTypedData: {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: voteString2Types,
          message: {
            choice: JSON.stringify({ 2: 1 }),
            reason: '',
            proposal: pollId,
            space: spaceId,
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        },
      },
      {
        proposal: mockSnapshotProposal({
          id: pollId,
          space: { id: spaceId, name: null },
          type: SnapshotVotingSystem.WEIGHTED,
          choices: ['a', 'b', 'c'],
        }),
        request: mockCreateUnsignedVoteRequest({ pollId, choice: [0, 1], voter }),
        expectedTypedData: {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: voteString2Types,
          message: {
            choice: JSON.stringify({ 2: 1 }),
            reason: '',
            proposal: pollId,
            space: spaceId,
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        },
      },
    ])(
      `should create an instance of ${UnsignedVote.name} for a proposal of type "$proposal.type"`,
      async ({ proposal, request, expectedTypedData }) => {
        const factory = setupTestScenario({ appId, proposal });

        const vote = await factory.createUnsignedVote(request);

        expect(vote).toBeInstanceOf(UnsignedVote);
        expect(vote.typedData).toMatchObject(expectedTypedData);
      },
    );

    it(`should throw an ${InvariantError.name} if the proposal has "privacy" set to "shutter"`, async () => {
      const proposal = mockSnapshotProposal({
        id: pollId,
        type: SnapshotVotingSystem.QUADRATIC,
        privacy: 'shutter',
      });
      const request = mockCreateUnsignedVoteRequest({ pollId, choice: 0, voter });
      const factory = setupTestScenario({ appId, proposal });

      await expect(factory.createUnsignedVote(request)).rejects.toThrow(InvariantError);
    });
  });
});
