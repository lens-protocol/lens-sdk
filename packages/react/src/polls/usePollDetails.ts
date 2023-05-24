import {
  PollPublication,
  SnapshotProposal,
  SnapshotVote,
  SnapshotVotePower,
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
export enum SnapshotVotingSystem {
  /**
   * Each user can select only one option.
   *
   * The results will reflect these votes as percentages of the total voting power of all voting participants cast on the specific choice.
   */
  SINGLE_CHOICE = 'single-choice',
  /**
   * Each user can select (approve) any number of choices.
   *
   * Each selected choice will receive equal voting power
   * i.e. if user selects two choices, each choice will receive the total voting power of the user.
   */
  APPROVAL = 'approval',
  /**
   * Each user can spread voting power across any number of choices.
   *
   * The results are calculated quadratically, thanks to which the **number of individual voters** matters more than the sum of voting power contributed.
   */
  QUADRATIC = 'quadratic',
  /**
   * Each user has to rank all choices in a desired order.
   *
   * In the **first step** votes are counted for each voter's number one choice.
   * If a choice receives more than 50% votes (cast on number one choices of each user), that choice wins.
   * The result will show the percentages reflecting how users voted for their **first choice only**.
   *
   * In the **second step** if the first-choice candidate doesn't get over 50% of the total votes the choice with the **fewest** number one votes is **eliminated**.
   * Voters who had chosen the defeated choice as number one now have their number two choice **counted as their number one** choice.
   *
   * The process continues over multiple rounds until a choice has more than half (> 50%) of the total votes.
   */
  RANKED_CHOICE = 'ranked-choice',
  /**
   * Each user can spread their voting power across any number of choices, from one to all.
   *
   * Their voting power will be divided between their chosen options according to how much
   * weight they attribute to each option by increasing or decreasing the voting power fraction.
   */
  WEIGHTED = 'weighted',
  /**
   * Each user can select one of three options: `For`, `Against`, `Abstain`.
   *
   * The votes cast on the `Abstain` choice are counted in calculating if the necessary quorum has been reached for a proposal to pass.
   */
  BASIC = 'basic',
}

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
