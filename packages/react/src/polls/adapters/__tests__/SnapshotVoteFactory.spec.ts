import {
  SnapshotProposal,
  SnapshotSpaceId,
  SnapshotVotingSystem,
} from '@lens-protocol/api-bindings';
import {
  mockGetSnapshotProposalDataResponse,
  mockSnapshotApolloClient,
  mockSnapshotProposal,
} from '@lens-protocol/api-bindings/mocks';
import { AppId, PollId } from '@lens-protocol/domain/entities';
import { mockAppId, mockCreateUnsignedVoteRequest, mockWallet } from '@lens-protocol/domain/mocks';
import { InvariantError, never } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { getAddress } from 'ethers/lib/utils';

import { SnapshotVoteFactory, UnsignedVote } from '../SnapshotVoteFactory';
import { vote2Types, voteArray2Types, voteString2Types } from '../types';

function setupTestScenario({ appId, proposal }: { appId?: AppId; proposal: SnapshotProposal }) {
  const client = mockSnapshotApolloClient([mockGetSnapshotProposalDataResponse({ proposal })]);

  return new SnapshotVoteFactory(client, (proposal.space?.id ?? never()) as SnapshotSpaceId, appId);
}

describe(`Given an instance of the ${SnapshotVoteFactory.name}`, () => {
  const voter = mockWallet({
    // ensures `from` has EIP-55 checksum
    address: mockEvmAddress().toLowerCase(),
  });

  const appId = mockAppId();

  describe.each([
    {
      proposal: mockSnapshotProposal({
        type: SnapshotVotingSystem.SINGLE_CHOICE,
      }),
    },
    {
      proposal: mockSnapshotProposal({
        type: SnapshotVotingSystem.BASIC,
      }),
    },
  ])(
    `when the ${SnapshotVoteFactory.prototype.createUnsignedVote.name} method is invoked for a proposal w/ "$proposal.type" voting system`,
    ({ proposal }) => {
      it(`should create an instance of ${UnsignedVote.name} w/ the expected EIP-712 typed data"`, async () => {
        const request = mockCreateUnsignedVoteRequest({
          pollId: proposal.id as PollId,
          choice: 0,
          voter,
        });
        const factory = setupTestScenario({ appId, proposal });

        const vote = await factory.createUnsignedVote(request);

        const expectedTypedData = {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: vote2Types,
          message: {
            choice: 1,
            reason: '',
            proposal: proposal.id,
            space: proposal.space?.id ?? never(),
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        };
        expect(vote).toBeInstanceOf(UnsignedVote);
        expect(vote.typedData).toMatchObject(expectedTypedData);
      });

      it.each([
        {
          choice: [0],
          description: 'not a number',
        },
        {
          choice: -1,
          description: 'less than 0',
        },
        {
          choice: proposal.choices.length,
          description: 'greater than the number of choices',
        },
      ])(
        `should throw an ${InvariantError.name} if the "choice" is $description`,
        async ({ choice }) => {
          const request = mockCreateUnsignedVoteRequest({
            pollId: proposal.id as PollId,
            choice,
            voter,
          });
          const factory = setupTestScenario({ proposal });

          await expect(factory.createUnsignedVote(request)).rejects.toThrow(InvariantError);
        },
      );
    },
  );

  describe.each([
    {
      proposal: mockSnapshotProposal({
        type: SnapshotVotingSystem.APPROVAL,
        choices: ['a', 'b', 'c'],
      }),
    },
    {
      proposal: mockSnapshotProposal({
        type: SnapshotVotingSystem.RANKED_CHOICE,
        choices: ['a', 'b', 'c'],
      }),
    },
  ])(
    `when the ${SnapshotVoteFactory.prototype.createUnsignedVote.name} method is invoked for a proposal w/ "$proposal.type" voting system`,
    ({ proposal }) => {
      it(`should create an instance of ${UnsignedVote.name} w/ the expected EIP-712 typed data"`, async () => {
        const request = mockCreateUnsignedVoteRequest({
          pollId: proposal.id as PollId,
          choice: [0, 1],
          voter,
        });
        const factory = setupTestScenario({ appId, proposal });

        const vote = await factory.createUnsignedVote(request);

        const expectedTypedData = {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: voteArray2Types,
          message: {
            choice: [1, 2],
            reason: '',
            proposal: proposal.id,
            space: proposal.space?.id ?? never(),
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        };
        expect(vote).toBeInstanceOf(UnsignedVote);
        expect(vote.typedData).toMatchObject(expectedTypedData);
      });

      it.each([
        {
          choice: 0,
          description: 'is not an array of numbers',
        },
        {
          choice: [],
          description: 'is an empty array',
        },
        {
          choice: [-1, 0],
          description: 'contains negative numbers',
        },
        {
          choice: [0, 1, 2, 3, 4, 5],
          description: 'contains more choices than the proposal has',
        },
        {
          choice: [0, 1, 1000],
          description: 'contains choices that are greater than the number of choices',
        },
      ])(
        `should throw an ${InvariantError.name} if the "choice" $description`,
        async ({ choice }) => {
          const request = mockCreateUnsignedVoteRequest({
            pollId: proposal.id as PollId,
            choice,
            voter,
          });
          const factory = setupTestScenario({ proposal });

          await expect(factory.createUnsignedVote(request)).rejects.toThrow(InvariantError);
        },
      );
    },
  );

  describe.each([
    {
      proposal: mockSnapshotProposal({
        type: SnapshotVotingSystem.QUADRATIC,
        choices: ['a', 'b', 'c'],
      }),
    },
    {
      proposal: mockSnapshotProposal({
        type: SnapshotVotingSystem.WEIGHTED,
        choices: ['a', 'b', 'c'],
      }),
    },
  ])(
    `when the ${SnapshotVoteFactory.prototype.createUnsignedVote.name} method is invoked for a proposal w/ "$proposal.type" voting system`,
    ({ proposal }) => {
      it(`should create an instance of ${UnsignedVote.name} w/ the expected EIP-712 typed data"`, async () => {
        const request = mockCreateUnsignedVoteRequest({
          pollId: proposal.id as PollId,
          choice: [0, 1, 0],
          voter,
        });
        const factory = setupTestScenario({ appId, proposal });

        const vote = await factory.createUnsignedVote(request);

        const expectedTypedData = {
          domain: {
            name: expect.any(String),
            version: expect.any(String),
          },
          types: voteString2Types,
          message: {
            choice: JSON.stringify({ 2: 1 }),
            reason: '',
            proposal: proposal.id,
            space: proposal.space?.id ?? never(),
            app: appId,
            metadata: '{}',
            from: getAddress(voter.address),
            timestamp: expect.any(Number),
          },
        };
        expect(vote).toBeInstanceOf(UnsignedVote);
        expect(vote.typedData).toMatchObject(expectedTypedData);
      });

      it.each([
        {
          choice: 0,
          description: 'is not an array of numbers',
        },
        {
          choice: [0],
          description: 'is shorter than the number of choices',
        },
        {
          choice: [-1, 0, 0],
          description: 'contains negative numbers',
        },
      ])(
        `should throw an ${InvariantError.name} if the "choice" $description`,
        async ({ choice }) => {
          const request = mockCreateUnsignedVoteRequest({
            pollId: proposal.id as PollId,
            choice,
            voter,
          });
          const factory = setupTestScenario({ proposal });

          await expect(factory.createUnsignedVote(request)).rejects.toThrow(InvariantError);
        },
      );
    },
  );

  describe(`when the proposal has "privacy" set to "shutter"`, () => {
    it(`should throw an ${InvariantError.name}`, async () => {
      const proposal = mockSnapshotProposal({
        type: SnapshotVotingSystem.QUADRATIC,
        privacy: 'shutter',
      });
      const request = mockCreateUnsignedVoteRequest({
        pollId: proposal.id as PollId,
        choice: 0,
        voter,
      });
      const factory = setupTestScenario({ appId, proposal });

      await expect(factory.createUnsignedVote(request)).rejects.toThrow(InvariantError);
    });
  });
});
