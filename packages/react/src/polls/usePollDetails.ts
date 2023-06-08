import {
  PollPublication,
  SnapshotProposal,
  SnapshotVote,
  SnapshotVotePower,
  SnapshotVotingSystem,
  useGetSnapshotProposal,
} from '@lens-protocol/api-bindings';
import {
  EthereumAddress,
  hasTwoOrMore,
  invariant,
  never,
  TwoAtLeastArray,
  Url,
} from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useSnapshotApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';
import { useActiveWalletVar } from '../wallet/adapters/ActiveWalletPresenter';

/**
 * @experimental
 */
export type SnapshotSpace = {
  id: string;
  name: string;
};

/**
 * @experimental
 */
export type PollChoice = {
  label: string;
  votes: number;
  didVote: boolean;
  percentage: number;
};

/**
 * @experimental
 */
export enum VoteEligibility {
  CAN_VOTE = 'CAN_VOTE',
  CANNOT_VOTE = 'CANNOT_VOTE',
  UNKNOWN = 'UNKNOWN',
}

function resolveVoteEligibility(power: SnapshotVotePower | null | undefined): VoteEligibility {
  if (!power || power.value === null) {
    return VoteEligibility.UNKNOWN;
  }

  if (power.value > 0) {
    return VoteEligibility.CAN_VOTE;
  }

  return VoteEligibility.CANNOT_VOTE;
}

/**
 * @experimental
 */
export type SnapshotDetails = {
  author: EthereumAddress;
  choices: TwoAtLeastArray<PollChoice>;
  eligibility: VoteEligibility;
  endAt: Date;
  isActive: boolean;
  isSingleChoice: boolean;
  quorum: number;
  snapshot: string | null;
  space: SnapshotSpace;
  startAt: Date;
  system: SnapshotVotingSystem;
  title: string;
  totalVotes: number;
  url: Url;
};

/**
 * @experimental
 */
export type UsePollDetailsArgs = {
  publication: PollPublication;
};

function isValidVoteChoice(data: unknown): data is Array<number> {
  return Array.isArray(data) && data.every(Number.isFinite);
}

function isChoiceIndex(data: unknown): data is number {
  return Number.isInteger(data);
}

function resolveMyChoices(vote: SnapshotVote | null | undefined): Array<number> {
  if (!vote) {
    return [];
  }

  if (isChoiceIndex(vote.choice)) {
    return [vote.choice - 1];
  }

  if (isValidVoteChoice(vote.choice)) {
    return vote.choice.map((choice) => choice - 1);
  }
  return [];
}

function buildPollChoices(
  proposal: SnapshotProposal,
  votes: Array<SnapshotVote | null>,
): TwoAtLeastArray<PollChoice> {
  invariant(hasTwoOrMore(proposal.choices), 'Snapshot proposal must have at least two choices');

  const myVote = votes.at(0);
  const myChoices = resolveMyChoices(myVote);
  const totalScores = proposal.scores_total ?? 0;

  return proposal.choices.map((choice, idx) => {
    const scores = proposal.scores?.[idx] ?? 0;

    return {
      label: choice ?? never('Choice must not be null'),
      votes: scores,
      didVote: myChoices.includes(idx),
      percentage: totalScores > 0 ? Math.max(0, Math.min(1, scores / totalScores)) * 100 : 0,
    };
  });
}

/**
 * Fetches details of a poll from Snapshot.
 *
 * @experimental
 * @category Publications
 * @group Hooks
 * @param args - {@link UsePollDetailsArgs}
 *
 * @example
 * ```tsx
 * import { PollPublication, usePollDetails } from '@lens-protocol/react-web';
 *
 *
 * function Poll({ publication }: { publication: PollPublication }) {
 *   const { data: poll, error, loading } = usePollDetails({ publication });
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <div>
 *       <p>{poll.title</p>
 *
 *       {poll.choices.map((choice, idx) => (
 *         <label key={idx}>
 *           <input
 *             type={poll.isSingleChoice ? 'radio' : 'checkbox'}
 *             defaultChecked={choice.didVote}
 *             readOnly={!poll.isActive}
 *             name="choice"
 *             value={idx}
 *           />
 *           {choice.label} ({choice.percentage.toPrecision(3)}%)
 *         </label>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function usePollDetails({
  publication,
}: UsePollDetailsArgs): ReadResult<SnapshotDetails, NotFoundError> {
  const wallet = useActiveWalletVar();

  const { data, loading } = useGetSnapshotProposal(
    useSnapshotApolloClient({
      variables: {
        spaceId: publication.contentInsight.spaceId,
        proposalId: publication.contentInsight.proposalId,
        includeVotes: wallet !== null,
        voterAddress: wallet?.address ?? '',
      },
    }),
  );

  if (data && !loading) {
    if (data.proposal === null) {
      return {
        data: undefined,
        error: new NotFoundError(`Snapshot proposal ${publication.contentInsight.proposalId}`),
        loading: false,
      };
    }

    return {
      data: {
        author: data.proposal.author,
        choices: buildPollChoices(data.proposal, data.votes ?? []),
        eligibility: resolveVoteEligibility(data.vp),
        endAt: new Date(data.proposal.end),
        isActive: data.proposal.state === 'active',
        isSingleChoice:
          data.proposal.type === SnapshotVotingSystem.SINGLE_CHOICE ||
          data.proposal.type === SnapshotVotingSystem.BASIC,
        quorum: data.proposal.quorum,
        snapshot: data.proposal.snapshot,
        space: {
          id: publication.contentInsight.spaceId,
          name: data.proposal.space?.name ?? publication.contentInsight.spaceId,
        },
        startAt: new Date(data.proposal.start),
        system: data.proposal.type as SnapshotVotingSystem,
        title: data.proposal.title,
        totalVotes: data.proposal.scores_total ?? 0,
        url: publication.contentInsight.url,
      },
      error: undefined,
      loading: false,
    };
  }

  return {
    data: undefined,
    error: undefined,
    loading: true,
  };
}
