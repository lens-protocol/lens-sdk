import {
  CollectPolicy,
  CollectPolicyType,
  ExplorePublication,
  ExplorePublicationsOrderByType,
  resolveCollectPolicy,
  useExplorePublications,
} from '@lens-protocol/react-web';

import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { formatAmount, formatFiatAmount } from '../utils/formatAmount';

function FollowerOnlyPolicy({ policy }: { policy: CollectPolicy }) {
  return policy.followerOnly === true ? <p>Only followers can collect.</p> : null;
}

function PublicationCollectPolicy({ publication }: { publication: ExplorePublication }) {
  const policy = resolveCollectPolicy(publication);

  if (!policy) return null;

  switch (policy.type) {
    case CollectPolicyType.FREE_COLLECT: {
      return (
        <>
          <p>Free collect.</p>
          <FollowerOnlyPolicy policy={policy} />
        </>
      );
    }
    case CollectPolicyType.PAID_COLLECT:
      return (
        <>
          <p>{`Paid collect: ${formatAmount(policy.fee.amount)} (${formatFiatAmount(
            policy.fee.amount,
            policy.fee.rate,
          )}).`}</p>
          <FollowerOnlyPolicy policy={policy} />
        </>
      );

    case CollectPolicyType.MULTIRECIPIENT_COLLECT: {
      return (
        <>
          <p>{`Paid multirecipient collect: ${formatAmount(policy.fee.amount)} (${formatFiatAmount(
            policy.fee.amount,
            policy.fee.rate,
          )}).`}</p>
          <FollowerOnlyPolicy policy={policy} />
        </>
      );
    }
  }
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
