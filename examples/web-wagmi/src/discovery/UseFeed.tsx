import { FeedEventItemType, isPostPublication, useFeed } from '@lens-protocol/react';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

const allFeedEventTypes = [
  FeedEventItemType.Comment,
  FeedEventItemType.Post,
  FeedEventItemType.Mirror,
  FeedEventItemType.CollectComment,
  FeedEventItemType.CollectPost,
];

export function UseFeed() {
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
        {allFeedEventTypes.map((value) => (
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
            &nbsp;{value}
          </label>
        ))}
      </fieldset>

      {data?.length === 0 && <p>No items</p>}

      {loading && <Loading />}

      {error && <ErrorMessage error={error} />}

      {data
        ?.filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
        ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}
