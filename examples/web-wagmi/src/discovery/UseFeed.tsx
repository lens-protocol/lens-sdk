import {
  FeedEventItemType,
  FeedItemFragment,
  isPostPublication,
  useFeed,
} from '@lens-protocol/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

type PublicationProps = {
  feedItem: FeedItemFragment;
};

function Publication({ feedItem: { root: publication } }: PublicationProps) {
  return (
    <Link
      to={`/publication/${publication.id}`}
      style={{
        color: 'inherit',
        margin: '1rem',
      }}
    >
      <PublicationCard publication={publication} />
    </Link>
  );
}

export function Feed() {
  const [restrictEventTypesTo, setRestrictEventTypesTo] = useState<FeedEventItemType[]>([
    FeedEventItemType.Post,
  ]);
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useFeed({
      profileId: '0x3a2a',
      restrictEventTypesTo,
    }),
  );

  return (
    <div>
      <h1>
        <code>useFeed</code>
      </h1>

      <fieldset>
        <legend>Restrict event types to</legend>
        {Object.entries(FeedEventItemType).map(([key, value]) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={restrictEventTypesTo.includes(value)}
              name="restrictEventTypesTo"
              value={value}
              onChange={(e) => {
                if (e.target.checked) {
                  setRestrictEventTypesTo([...restrictEventTypesTo, value]);
                } else {
                  setRestrictEventTypesTo(restrictEventTypesTo.filter((i) => i !== value));
                }
              }}
            />
            &nbsp;{key}
          </label>
        ))}
      </fieldset>

      {data?.length === 0 && <p>No items</p>}

      {loading && <Loading />}

      {error && <ErrorMessage error={error} />}

      {data
        ?.filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <Publication key={`${item.root.id}-${i}`} feedItem={item} />
        ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}
