import { getAddress } from '@ethersproject/address';
import {
  SafeApolloClient,
  GetSnapshotProposalDocument,
  SnapshotSpaceId,
  GetSnapshotProposalData,
  GetSnapshotProposalVariables,
  SnapshotProposal,
  SnapshotVotingSystem,
} from '@lens-protocol/api-bindings';
import { TypedData } from '@lens-protocol/blockchain-bindings';
import { AppId, Wallet, IUnsignedVote, PollId } from '@lens-protocol/domain/entities';
import {
  CreateUnsignedVoteRequest,
  IUnsignedVoteFactory,
  VoteChoice,
} from '@lens-protocol/domain/use-cases/polls';
import { invariant, InvariantError, never } from '@lens-protocol/shared-kernel';

import { vote2Types, voteArray2Types, voteString2Types } from './types';

export class UnsignedVote implements IUnsignedVote {
  constructor(readonly pollId: PollId, readonly typedData: TypedData) {}
}

type Message = {
  app: string;
  choice: number | number[] | string;
  from: string;
  metadata: string;
  proposal: string;
  reason: string;
  space: string;
  timestamp: number;
};

function createTypedData({
  message,
  types,
}: {
  message: Partial<Message>;
  types: typeof vote2Types | typeof voteArray2Types;
}): TypedData {
  return {
    domain: {
      name: 'snapshot',
      version: '0.1.4',
    },
    types,
    message: {
      reason: '',
      app: '',
      metadata: '{}',
      timestamp: parseInt((Date.now() / 1e3).toFixed()),
      ...message,
    },
  };
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function validateSingleChoice(
  request: { choice: VoteChoice },
  proposal: SnapshotProposal,
): asserts request is { choice: number } {
  invariant(isNumber(request.choice), 'Choice must be an number');
  invariant(request.choice >= 0, 'Choice is a 0-based index, it must be a positive number');
  invariant(
    request.choice < proposal.choices.length,
    'Choice is a 0-based index, it must be less than the number of choices',
  );
}

function singleChoiceTypedData(
  proposal: SnapshotProposal,
  choice: number,
  voter: Wallet,
  appId?: AppId,
): TypedData {
  return createTypedData({
    message: {
      app: appId ?? '',
      choice: choice + 1,
      from: getAddress(voter.address),
      proposal: proposal.id,
      space: proposal.space?.id ?? never(),
    },
    types: vote2Types,
  });
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isNumber);
}

function validateMultipleChoice(
  request: { choice: VoteChoice },
  proposal: SnapshotProposal,
): asserts request is { choice: number[] } {
  invariant(isNumberArray(request.choice), 'Choice must be an array of numbers');
  invariant(request.choice.length > 0, 'Choice must contain at least one choice');
  invariant(
    request.choice.length <= proposal.choices.length,
    'Choice must contain at most the number of choices',
  );
  invariant(
    request.choice.every((c) => c >= 0),
    'Choice is a 0-based index, it must be a positive number',
  );
  invariant(
    request.choice.every((c) => c < proposal.choices.length),
    'Choice is a 0-based index, it must be less than the number of choices',
  );
}

function multipleChoiceTypedData(
  proposal: SnapshotProposal,
  choice: number[],
  voter: Wallet,
  appId?: AppId,
): TypedData {
  return createTypedData({
    message: {
      app: appId ?? '',
      choice: choice.map((c) => c + 1),
      from: getAddress(voter.address),
      proposal: proposal.id,
      space: proposal.space?.id ?? never(),
    },
    types: voteArray2Types,
  });
}

function serializeWeightedChoice(choice: number[]): string {
  const map = choice.reduce((acc, value, idx) => {
    if (value > 0) {
      acc[idx + 1] = value;
    }
    return acc;
  }, {} as { [key: number]: number });
  return JSON.stringify(map);
}

function validateWeightedChoice(
  request: { choice: VoteChoice },
  proposal: SnapshotProposal,
): asserts request is { choice: number[] } {
  invariant(isNumberArray(request.choice), 'Choice must be an array of numbers');
  invariant(
    request.choice.length === proposal.choices.length,
    'Choice must specify a value for each proposal choice',
  );
  invariant(
    request.choice.every((c) => c >= 0),
    'Choice is a 0-based index, it must be a positive number',
  );
}

function weightedChoiceTypedData(
  proposal: SnapshotProposal,
  choice: number[],
  voter: Wallet,
  appId?: AppId,
): TypedData {
  return createTypedData({
    message: {
      app: appId ?? '',
      choice: serializeWeightedChoice(choice),
      from: getAddress(voter.address),
      proposal: proposal.id,
      space: proposal.space?.id ?? never(),
    },
    types: voteString2Types,
  });
}

function resolveTypedData(
  proposal: SnapshotProposal,
  request: CreateUnsignedVoteRequest,
  appId?: AppId,
): TypedData {
  switch (proposal.type) {
    case SnapshotVotingSystem.BASIC:
    case SnapshotVotingSystem.SINGLE_CHOICE:
      validateSingleChoice(request, proposal);
      return singleChoiceTypedData(proposal, request.choice, request.voter, appId);

    case SnapshotVotingSystem.APPROVAL:
    case SnapshotVotingSystem.RANKED_CHOICE:
      validateMultipleChoice(request, proposal);
      return multipleChoiceTypedData(proposal, request.choice, request.voter, appId);

    case SnapshotVotingSystem.QUADRATIC:
    case SnapshotVotingSystem.WEIGHTED:
      validateWeightedChoice(request, proposal);
      return weightedChoiceTypedData(proposal, request.choice, request.voter, appId);

    default:
      throw new InvariantError(`Unsupported voting system: ${String(proposal.type)}`);
  }
}

export class SnapshotVoteFactory implements IUnsignedVoteFactory {
  constructor(
    private readonly client: SafeApolloClient,
    private readonly spaceId: SnapshotSpaceId,
    private readonly appId?: AppId,
  ) {}

  async createUnsignedVote(request: CreateUnsignedVoteRequest): Promise<UnsignedVote> {
    const result = await this.client.query<GetSnapshotProposalData, GetSnapshotProposalVariables>({
      query: GetSnapshotProposalDocument,
      variables: {
        spaceId: this.spaceId,
        proposalId: request.pollId,
        includeVotes: false,
        voterAddress: '0x000',
      },
    });

    const proposal = result.data.proposal;
    invariant(proposal !== null, 'Proposal not found');
    invariant(
      proposal.privacy !== 'shutter',
      'Proposal with shutter privacy are not supported at this time',
    );

    return new UnsignedVote(request.pollId, resolveTypedData(proposal, request, this.appId));
  }
}
