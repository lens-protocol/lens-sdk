import {
  ExplorePublication,
  ExplorePublicationsOrderByType,
  isMultirecipientCollectFee,
  resolveCollectPolicy,
  useExplorePublications,
} from '@lens-protocol/react-web';

import { PublicationCard } from '../components/cards';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { formatAmount, formatFiatAmount } from '../utils/formatAmount';

function PublicationCollectPolicy({ publication }: { publication: ExplorePublication }) {
  const policy = resolveCollectPolicy(publication);

  if (!policy) return null;

  return (
    <div>
      {policy.followerOnly === true && <div>Only followers can collect</div>}
      {policy.collectLimit && <div>{`Collect limit: ${policy.collectLimit}`}</div>}
      {policy.endsAt && <div>{`Ends at: ${policy.endsAt}`}</div>}
      {!policy.fee ? (
        <div>Free collect</div>
      ) : (
        <>
          <div>{`Paid collect: ${formatAmount(policy.fee.amount)} (${formatFiatAmount(
            policy.fee.amount,
            policy.fee.rate,
          )})`}</div>
          {policy.fee.referralFee > 0 && <div>{`Referral fee: ${policy.fee.referralFee}%`}</div>}
          {!isMultirecipientCollectFee(policy.fee) ? (
            <div>{`Recipient: ${policy.fee.recipient}`}</div>
          ) : (
            <div>{`Recipients: ${policy.fee.recipients.map((r) => r.recipient).join(', ')}`}</div>
          )}
        </>
      )}
    </div>
  );
}

export function UseExplorePublications() {
  const {
    data: publications,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useExplorePublications({
      orderBy: ExplorePublicationsOrderByType.Latest,
      suspense: true,
    }),
  );

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
