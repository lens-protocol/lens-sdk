import {
  Amount,
  Erc20,
  FollowPolicyType,
  useCurrencies,
  useUpdateFollowPolicy,
  FollowPolicy,
  ChargeFollowConfig,
  NoFeeFollowConfig,
  ProfileOwnedByMe,
} from '@lens-protocol/react-web';
import { useState } from 'react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant, never } from '../utils';

type SupportedFollowPolicy = Exclude<FollowPolicyType, FollowPolicyType.UNKNOWN>;

const followPolicyTypeToDescriptionMap: Record<SupportedFollowPolicy, string> = {
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
  followPolicyType: SupportedFollowPolicy;
  amount?: Amount<Erc20>;
  recipient?: string;
}): ChargeFollowConfig | NoFeeFollowConfig {
  if (followPolicyType === FollowPolicyType.CHARGE) {
    return {
      type: FollowPolicyType.CHARGE,
      amount: amount ?? never(),
      recipient: recipient ?? never(),
    };
  }

  return {
    type: FollowPolicyType[followPolicyType],
  };
}

function FollowPolicyRadioButton({
  followPolicyType,
  selectedFollowPolicyType,
  setSelectedFollowPolicyType,
}: {
  followPolicyType: SupportedFollowPolicy;
  selectedFollowPolicyType: FollowPolicyType | null;
  setSelectedFollowPolicyType: (followPolicyType: FollowPolicyType) => void;
}) {
  return (
    <div>
      <input
        type="radio"
        id={followPolicyType}
        name="followPolicyType"
        value={followPolicyType}
        onChange={() => setSelectedFollowPolicyType(followPolicyType as FollowPolicyType)}
        checked={selectedFollowPolicyType === followPolicyType}
      />
      <label htmlFor={followPolicyType}>{followPolicyTypeToDescriptionMap[followPolicyType]}</label>
    </div>
  );
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
  profile: ProfileOwnedByMe;
  currentFollowPolicy: FollowPolicy | null;
  currencies: Erc20[];
};

function UpdateFollowPolicyForm({
  profile,
  currencies,
  currentFollowPolicy,
}: UpdateFollowPolicyFormProps) {
  const { execute: updateFollowPolicy, isPending, error } = useUpdateFollowPolicy({ profile });
  const [selectedFollowPolicyType, setSelectedFollowPolicyType] = useState<FollowPolicyType | null>(
    currentFollowPolicy?.type ?? null,
  );

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
      });

      return;
    }

    invariant(selectedFollowPolicyType !== null, 'No follow policy type selected');
    invariant(selectedFollowPolicyType !== FollowPolicyType.UNKNOWN, 'Unknown follow policy type');

    await updateFollowPolicy({
      followPolicy: resolveFollowPolicy({ followPolicyType: selectedFollowPolicyType }),
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p>Select a follow policy:</p>

        <FollowPolicyRadioButton
          followPolicyType={FollowPolicyType.ONLY_PROFILE_OWNERS}
          selectedFollowPolicyType={selectedFollowPolicyType}
          setSelectedFollowPolicyType={setSelectedFollowPolicyType}
        />

        <FollowPolicyRadioButton
          followPolicyType={FollowPolicyType.ANYONE}
          selectedFollowPolicyType={selectedFollowPolicyType}
          setSelectedFollowPolicyType={setSelectedFollowPolicyType}
        />

        <FollowPolicyRadioButton
          followPolicyType={FollowPolicyType.NO_ONE}
          selectedFollowPolicyType={selectedFollowPolicyType}
          setSelectedFollowPolicyType={setSelectedFollowPolicyType}
        />

        <FollowPolicyRadioButton
          followPolicyType={FollowPolicyType.CHARGE}
          selectedFollowPolicyType={selectedFollowPolicyType}
          setSelectedFollowPolicyType={setSelectedFollowPolicyType}
        />

        {!selectedFollowPolicyType && profile.followPolicy?.type !== FollowPolicyType.UNKNOWN && (
          <p>Your current follow policy is unsupported by the Lens SDK.</p>
        )}
      </div>

      {selectedFollowPolicyType === FollowPolicyType.CHARGE && (
        <div>
          <label htmlFor="chargeCurrency">Fee Currency</label>
          <select
            name="chargeCurrency"
            defaultValue={
              profile.followPolicy?.type === FollowPolicyType.CHARGE
                ? profile.followPolicy.amount.asset.symbol
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
              profile.followPolicy?.type === FollowPolicyType.CHARGE
                ? profile.followPolicy.amount.toNumber()
                : undefined
            }
            name="chargeFee"
            type="text"
            placeholder="Enter a fee"
          />
          <label htmlFor="chargeFeeRecipient">Follow Fee Recipient</label>
          <input
            defaultValue={
              profile.followPolicy?.type === FollowPolicyType.CHARGE
                ? profile.followPolicy.recipient
                : profile.ownedBy
            }
            name="chargeFeeRecipient"
            type="text"
            placeholder="Enter a follow fee recipient address"
          />
        </div>
      )}

      <button
        disabled={currentFollowPolicy?.type === selectedFollowPolicyType || isPending}
        type="submit"
      >
        <UpdateButtonText
          isTxPending={isPending}
          currentFollowModule={currentFollowPolicy?.type ?? null}
          followPolicyTypeToUpdate={selectedFollowPolicyType}
        />
      </button>

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
  profile: ProfileOwnedByMe;
};

function UpdateFollowPolicy({ profile }: UpdateFollowPolicyProps) {
  const { data: currencies, error, loading } = useCurrencies();
  const currentFollowPolicy = profile.followPolicy;

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <UpdateFollowPolicyForm
      profile={profile}
      currencies={currencies}
      currentFollowPolicy={currentFollowPolicy}
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
