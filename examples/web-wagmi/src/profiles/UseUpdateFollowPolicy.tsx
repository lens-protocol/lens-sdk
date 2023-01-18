import {
  Amount,
  ChargeFollowPolicy,
  Erc20,
  FollowPolicyType,
  getFollowPolicyTypeFromProfileFieldsFragment,
  NoFeeFollowPolicy,
  ProfileFieldsFragment,
  useCurrencies,
  useUpdateFollowPolicy,
} from '@lens-protocol/react';
import { useState } from 'react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { never } from '../utils';

const followPolicyTypeToDescriptionMap: Record<FollowPolicyType, string> = {
  [FollowPolicyType.ONLY_PROFILE_OWNERS]: 'Only holders of Lens profiles can follow',
  [FollowPolicyType.ANYONE]: 'Anyone can follow',
  [FollowPolicyType.NO_ONE]: 'No one can follow',
  [FollowPolicyType.CHARGE]: 'Anyone can follow, but they must pay a fee',
};

function resolveFollowPolicy({
  followPolicyType,
  amount,
  recipient,
}: {
  followPolicyType: FollowPolicyType;
  amount?: Amount<Erc20>;
  recipient?: string;
}): ChargeFollowPolicy | NoFeeFollowPolicy {
  if (followPolicyType === FollowPolicyType.CHARGE) {
    return {
      type: FollowPolicyType.CHARGE,
      amount: amount ?? never(),
      recipient: recipient ?? never(),
    };
  }

  return {
    type: followPolicyType,
  };
}

type UpdateButtonTextProps = {
  isTxPending: boolean;
  currentFollowModule: FollowPolicyType | null;
  followPolicyTypeToUpdate: FollowPolicyType | null;
};

function UpdateButtonText({
  isTxPending,
  currentFollowModule,
  followPolicyTypeToUpdate,
}: UpdateButtonTextProps) {
  if (isTxPending) return <>Updating...</>;

  if (currentFollowModule === followPolicyTypeToUpdate) {
    return <>This is your current follow policy</>;
  }

  return <>Update</>;
}

type UpdateFollowPolicyFormProps = {
  profile: ProfileFieldsFragment;
  currentFollowModule: FollowPolicyType;
  currencies: Erc20[];
};

function UpdateFollowPolicyForm({
  profile,
  currencies,
  currentFollowModule,
}: UpdateFollowPolicyFormProps) {
  const { updateFollowPolicy, isPending, error } = useUpdateFollowPolicy();
  const [selectedFollowPolicyType, setSelectedFollowPolicyType] =
    useState<FollowPolicyType>(currentFollowModule);
  const [hasSuccessfulUpdatedFollowPolicy, setHasSuccessfulUpdatedFollowPolicy] =
    useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (selectedFollowPolicyType === FollowPolicyType.CHARGE) {
      const amount = formData.get('chargeFee') as string;
      const currency = formData.get('chargeCurrency') as string;
      const recipient = formData.get('chargeFeeRecipient') as string;

      const erc20 = currencies.find((c) => c.symbol === currency) ?? never();
      const fee = Amount.erc20(erc20, amount);

      await updateFollowPolicy({
        followPolicy: resolveFollowPolicy({
          amount: fee,
          followPolicyType: selectedFollowPolicyType,
          recipient,
        }),
        profileId: profile.id,
      });
      setHasSuccessfulUpdatedFollowPolicy(true);
      return;
    }

    await updateFollowPolicy({
      followPolicy: resolveFollowPolicy({ followPolicyType: selectedFollowPolicyType }),
      profileId: profile.id,
    });
    setHasSuccessfulUpdatedFollowPolicy(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p>Select a follow policy:</p>
        {Object.keys(FollowPolicyType).map((followPolicyType) => (
          <div key={followPolicyType}>
            <input
              type="radio"
              id={followPolicyType}
              name="followPolicyType"
              value={followPolicyType}
              onChange={() => setSelectedFollowPolicyType(followPolicyType as FollowPolicyType)}
              checked={selectedFollowPolicyType === followPolicyType}
            />
            <label htmlFor={followPolicyType}>
              {followPolicyTypeToDescriptionMap[followPolicyType as FollowPolicyType]}
            </label>
          </div>
        ))}
      </div>

      {selectedFollowPolicyType === FollowPolicyType.CHARGE && (
        <div>
          <label htmlFor="chargeCurrency">Fee Currency</label>
          <select
            name="chargeCurrency"
            defaultValue={
              profile.followModule?.__typename === 'FeeFollowModuleSettings'
                ? profile.followModule.amount.value
                : undefined
            }
          >
            {currencies.map((currency) => (
              <option key={currency.symbol} value={currency.symbol}>
                {currency.symbol}
              </option>
            ))}
          </select>
          <label htmlFor="chargeFee">Fee Amount</label>
          <input
            defaultValue={
              profile.followModule?.__typename === 'FeeFollowModuleSettings'
                ? profile.followModule.amount.value
                : undefined
            }
            name="chargeFee"
            type="text"
            placeholder="Enter a fee"
          />
          <label htmlFor="chargeFeeRecipient">Follow Fee Recipient</label>
          <input
            defaultValue={
              profile.followModule?.__typename === 'FeeFollowModuleSettings'
                ? profile.followModule.recipient
                : profile.ownedBy
            }
            name="chargeFeeRecipient"
            type="text"
            placeholder="Enter a follow fee recipient address"
          />
        </div>
      )}

      {!hasSuccessfulUpdatedFollowPolicy && (
        <button
          disabled={currentFollowModule === selectedFollowPolicyType || isPending}
          type="submit"
        >
          <UpdateButtonText
            isTxPending={isPending}
            currentFollowModule={currentFollowModule}
            followPolicyTypeToUpdate={selectedFollowPolicyType}
          />
        </button>
      )}
      {hasSuccessfulUpdatedFollowPolicy && !error && <p>Follow policy updated!</p>}
      {error && <p>{error.message}</p>}
      <style>
        {`
          input[type=text] {
            width: 100%;
          }
        `}
      </style>
    </form>
  );
}

type UpdateFollowPolicyProps = {
  profile: ProfileFieldsFragment;
};

function UpdateFollowPolicy({ profile }: UpdateFollowPolicyProps) {
  const currentFollowModule = getFollowPolicyTypeFromProfileFieldsFragment(profile);

  const { data: currencies, loading } = useCurrencies();

  if (loading) return <Loading />;

  if (!currencies || !currentFollowModule) return <p>Error</p>;

  return (
    <UpdateFollowPolicyForm
      profile={profile}
      currencies={currencies}
      currentFollowModule={currentFollowModule}
    />
  );
}

export function UseUpdateFollowPolicy() {
  return (
    <>
      <h1>
        <code>useUpdateFollowPolicy</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <UpdateFollowPolicy profile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to update your follow policy." />
    </>
  );
}
