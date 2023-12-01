import {
  Amount,
  Erc20,
  FollowPolicyType,
  Profile,
  resolveFollowPolicy,
  useCurrencies,
  useUpdateFollowPolicy,
} from '@lens-protocol/react-web';
import { useState } from 'react';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant, never } from '../utils';

type SupportedFollowPolicy = Exclude<FollowPolicyType, FollowPolicyType.UNKNOWN>;

const followPolicyTypeToDescriptionMap: Record<SupportedFollowPolicy, string> = {
  [FollowPolicyType.ANYONE]: 'Anyone can follow',
  [FollowPolicyType.NO_ONE]: 'No one can follow',
  [FollowPolicyType.CHARGE]: 'Anyone can follow, but they must pay a fee',
};

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
  profile: Profile;
  currencies: Erc20[];
};

function UpdateFollowPolicyForm({ profile, currencies }: UpdateFollowPolicyFormProps) {
  const followPolicy = resolveFollowPolicy(profile);

  const { execute: updateFollowPolicy, loading, error } = useUpdateFollowPolicy();
  const [selectedFollowPolicyType, setSelectedFollowPolicyType] = useState<FollowPolicyType | null>(
    followPolicy.type,
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
        followPolicy: {
          type: FollowPolicyType.CHARGE,
          amount: fee,
          recipient,
        },
        sponsored: formData.get('sponsored') === 'on',
      });

      return;
    }

    invariant(selectedFollowPolicyType !== null, 'No follow policy type selected');
    invariant(selectedFollowPolicyType !== FollowPolicyType.UNKNOWN, 'Unknown follow policy type');

    await updateFollowPolicy({
      followPolicy: { type: selectedFollowPolicyType },
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p>Select a follow policy:</p>

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

        {!selectedFollowPolicyType && followPolicy.type !== FollowPolicyType.UNKNOWN && (
          <p>Your current follow policy is unsupported by the Lens SDK.</p>
        )}
      </div>

      {selectedFollowPolicyType === FollowPolicyType.CHARGE && (
        <div>
          <label htmlFor="chargeCurrency">Fee Currency</label>
          <select
            name="chargeCurrency"
            defaultValue={
              followPolicy.type === FollowPolicyType.CHARGE
                ? followPolicy.amount.asset.symbol
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
              followPolicy.type === FollowPolicyType.CHARGE
                ? followPolicy.amount.toNumber()
                : undefined
            }
            name="chargeFee"
            type="text"
            placeholder="Enter a fee"
          />
          <label htmlFor="chargeFeeRecipient">Follow Fee Recipient</label>
          <input
            defaultValue={
              followPolicy.type === FollowPolicyType.CHARGE
                ? followPolicy.recipient
                : profile.ownedBy.address
            }
            name="chargeFeeRecipient"
            type="text"
            placeholder="Enter a follow fee recipient address"
          />
        </div>
      )}

      <label>
        <input
          type="checkbox"
          name="sponsored"
          disabled={loading}
          value="on"
          defaultChecked={true}
        />
        Should use sponsored approach?
      </label>

      <button disabled={followPolicy.type === selectedFollowPolicyType || loading} type="submit">
        <UpdateButtonText
          isTxPending={loading}
          currentFollowModule={followPolicy.type}
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
  profile: Profile;
};

function UpdateFollowPolicy({ profile }: UpdateFollowPolicyProps) {
  const { data: currencies, error, loading } = useCurrencies();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return <UpdateFollowPolicyForm profile={profile} currencies={currencies} />;
}

export function UseUpdateFollowPolicy() {
  return (
    <>
      <h1>
        <code>useUpdateFollowPolicy</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UpdateFollowPolicy profile={profile} />}
      </RequireProfileSession>
    </>
  );
}
