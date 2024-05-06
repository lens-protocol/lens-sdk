import {
  CollectFee,
  ExplorePublication,
  ExplorePublicationsOrderByType,
  MultirecipientCollectFee,
  isMultirecipientCollectFee,
  resolveCollectPolicy,
  useExplorePublications,
} from '@lens-protocol/react-web';

import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { formatAmount } from '../utils/formatAmount';

export function formatCollectFee({ amount, rate }: CollectFee | MultirecipientCollectFee) {
  if (rate) {
    const fiat = amount.convert(rate);
    return `${formatAmount(amount)} (${formatAmount(fiat)})`;
  }
  return formatAmount(amount);
}

export function CollectFeeDetails({ fee }: { fee: CollectFee | MultirecipientCollectFee }) {
  return (
    <div>
      <p>{`Paid collect: ${formatCollectFee(fee)}`}</p>

      {fee.referralFee > 0 && <div>{`Referral fee: ${fee.referralFee}%`}</div>}

      {isMultirecipientCollectFee(fee) ? (
        <p>{`Recipients: ${fee.recipients.map((r) => r.recipient).join(', ')}`}</p>
      ) : (
        <p>{`Recipient: ${fee.recipient}`}</p>
      )}
    </div>
  );
}

function PublicationCollectPolicy({ publication }: { publication: ExplorePublication }) {
  const policy = resolveCollectPolicy(publication);

  if (!policy) return null;

  return (
    <div>
      {policy.followerOnly === true && <p>Only followers can collect</p>}

      {policy.collectLimit && <p>{`Collect limit: ${policy.collectLimit}`}</p>}

      {policy.endsAt && <p>{`Ends at: ${policy.endsAt}`}</p>}

      {policy.fee === null && <p>Free collect</p>}

      {policy.fee && <CollectFeeDetails fee={policy.fee} />}
    </div>
  );
}

export function UseExplorePublications() {
  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useExplorePublications({
      orderBy: ExplorePublicationsOrderByType.Latest,
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useExplorePublications</code>
      </h1>
      <div>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication}>
            <PublicationCollectPolicy publication={publication} />
          </PublicationCard>
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
