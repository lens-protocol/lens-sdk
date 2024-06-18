import {
  CollectFee,
  ExplorePublication,
  MintFee,
  MultirecipientCollectFee,
  isMultirecipientCollectFee,
  resolveCollectPolicy,
} from '@lens-protocol/react-web';

import { formatAmount } from '../utils/formatAmount';

export function formatFee({ amount, rate }: CollectFee | MultirecipientCollectFee | MintFee) {
  if (rate) {
    const fiat = amount.convert(rate);
    return `${formatAmount(amount)} (${formatAmount(fiat)})`;
  }
  return formatAmount(amount);
}

export function CollectFeeDetails({ fee }: { fee: CollectFee | MultirecipientCollectFee }) {
  return (
    <div>
      <span>Collect Fee: {formatFee(fee)}</span>
      <ul>
        {fee.referralFee > 0 && <li>Referral fee: {fee.referralFee}%</li>}

        {isMultirecipientCollectFee(fee) ? (
          <div>
            Recipients:
            <ul>
              {fee.recipients.map((r) => (
                <li key={r.recipient}>
                  {r.recipient} ({r.split}%)
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <li>Recipient: {fee.recipient}</li>
        )}
      </ul>
    </div>
  );
}

function MintFeeDetails({ fee }: { fee: MintFee }) {
  return (
    <div>
      <span>Mint fee: {formatFee(fee)}</span>
      <ul>
        <li>Creator: {fee.distribution.creatorSplit}%</li>
        <li>Creator App: {fee.distribution.creatorClientSplit}%</li>
        <li>Executor App: {fee.distribution.executorClientSplit}%</li>
        <li>Protocol: {fee.distribution.protocolSplit}%</li>
      </ul>
    </div>
  );
}

export function CollectCriteria({ publication }: { publication: ExplorePublication }) {
  const policy = resolveCollectPolicy(publication);

  if (!policy) return <p>The publication is not collectable.</p>;

  return (
    <ul>
      {policy.followerOnly === true && <li>Only followers can collect</li>}

      {policy.collectLimit && <li>Collect limit: {policy.collectLimit}</li>}

      {policy.endsAt && <li>Ends at: {policy.endsAt}</li>}

      {policy.collectFee === null && policy.mintFee === null && <li>Free collect</li>}

      {policy.collectFee && (
        <li>
          <CollectFeeDetails fee={policy.collectFee} />
        </li>
      )}

      {policy.mintFee && (
        <li>
          <MintFeeDetails fee={policy.mintFee} />
        </li>
      )}
    </ul>
  );
}
