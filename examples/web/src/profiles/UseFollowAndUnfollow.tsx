import {
  BroadcastingError,
  FollowPolicyType,
  InsufficientAllowanceError,
  InsufficientFundsError,
  InsufficientGasError,
  PendingSigningRequestError,
  PrematureFollowError,
  Profile,
  TransactionError,
  TriStateValue,
  UserRejectedError,
  WalletConnectionError,
  resolveFollowPolicy,
  useExploreProfiles,
  useFollow,
  useUnfollow,
} from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { formatAmount, formatFiatAmount } from '../utils/formatAmount';
import { ProfileCard } from './components/ProfileCard';

function handleFollowError(
  error:
    | BroadcastingError
    | InsufficientAllowanceError
    | InsufficientFundsError
    | InsufficientGasError
    | PendingSigningRequestError
    | PrematureFollowError
    | UserRejectedError
    | TransactionError
    | WalletConnectionError,
) {
  switch (error.name) {
    case 'InsufficientAllowanceError':
      toast.error(
        'You must approve the contract to spend at least: ' +
          `${error.requestedAmount.asset.symbol} ${error.requestedAmount.toSignificantDigits(6)}`,
      );
      break;

    case 'InsufficientFundsError':
      toast.error(
        'You do not have enough funds to pay for this follow fee: ' +
          `${error.requestedAmount.asset.symbol} ${error.requestedAmount.toSignificantDigits(6)}`,
      );
      break;

    case 'InsufficientGasError':
      toast.error('You do not have enough funds to pay for this tx gas.');
      break;

    case 'UserRejectedError':
      // do nothing
      break;
    default:
      toast.error(error.message);
  }
}

function FollowButton({ profile }: { profile: Profile }) {
  const { execute: executeFollow, error: followError, loading: isFollowLoading } = useFollow();

  const {
    execute: executeUnfollow,
    error: unfollowError,
    loading: isUnfollowLoading,
  } = useUnfollow();

  const paidFollow = async () => {
    const result = await executeFollow({ profile, sponsored: false });

    if (result.isFailure()) {
      return handleFollowError(result.error);
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      return handleFollowError(completion.error);
    }
    toast.success('Followed successfully');
  };

  const sponsoredFollow = async () => {
    const result = await executeFollow({ profile });

    if (result.isFailure()) {
      if (result.error instanceof BroadcastingError) {
        return paidFollow();
      }
      return handleFollowError(result.error);
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      return handleFollowError(completion.error);
    }
    toast.success('Followed successfully');
  };

  const unfollow = async () => {
    const result = await executeUnfollow({ profile });

    if (result.isFailure()) {
      return handleFollowError(result.error);
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      return handleFollowError(completion.error);
    }
    toast.success('Unfollowed successfully');
  };

  if (profile.operations.isFollowedByMe.value) {
    return (
      <>
        <button
          onClick={unfollow}
          disabled={isUnfollowLoading || !profile.operations.canUnfollow}
          title={
            profile.operations.canUnfollow
              ? 'Click to unfollow'
              : 'Follow request not finalized yet'
          }
        >
          Unfollow
        </button>
        {unfollowError && <p>{unfollowError.message}</p>}
      </>
    );
  }

  return (
    <>
      <p>Follow options:</p>
      <button
        onClick={sponsoredFollow}
        disabled={isFollowLoading || profile.operations.canFollow !== TriStateValue.Yes}
        title={
          profile.operations.canFollow === TriStateValue.Yes
            ? 'Click to follow'
            : 'Unfollow request not finalized yet'
        }
      >
        Sponsored
      </button>
      &nbsp;
      <button
        onClick={paidFollow}
        disabled={isFollowLoading || profile.operations.canFollow !== TriStateValue.Yes}
        title={
          profile.operations.canFollow === TriStateValue.Yes
            ? 'Click to follow paying gas with your wallet'
            : 'Unfollow request not finalized yet'
        }
      >
        Self-funded
      </button>
      {followError && <p>{followError.message}</p>}
    </>
  );
}

function FollowPolicy({ profile }: { profile: Profile }) {
  const policy = resolveFollowPolicy(profile);

  switch (policy.type) {
    case FollowPolicyType.ANYONE:
      return <p>Anyone can follow this profile.</p>;
    case FollowPolicyType.CHARGE:
      return (
        <p>{`You must pay ${formatAmount(policy.amount)} (${formatFiatAmount(
          policy.amount,
          policy.rate,
        )}) to follow this profile.`}</p>
      );
    case FollowPolicyType.NO_ONE:
      return <p>You cannot follow this profile.</p>;
    case FollowPolicyType.UNKNOWN:
      return <p>Unknown policy.</p>;
  }
}

function UseFollowInner() {
  const { data, error, loading } = useExploreProfiles();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.map((p) => (
        <ProfileCard profile={p} key={p.id}>
          <FollowPolicy profile={p} />
          <FollowButton profile={p} />
        </ProfileCard>
      ))}
    </>
  );
}

export function UseFollowAndUnfollow() {
  return (
    <>
      <h1>
        <code>useFollow / useUnfollow</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        <UseFollowInner />
      </RequireProfileSession>
    </>
  );
}
