import { FeedEventItemType, ProfileOwnedByMeFragment, useFeed } from '@lens-protocol/react-web';
import { useState } from 'react';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
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

type UseFeedInnerProps = {
  profile: ProfileOwnedByMeFragment;
};

function UseFeedInner({ profile }: UseFeedInnerProps) {
  const [restrictEventTypesTo, setRestrictEventTypesTo] = useState<FeedEventItemType[]>([
    FeedEventItemType.Post,
  ]);
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useFeed({
      profileId: profile.id,
      ...(restrictEventTypesTo.length > 0 && { restrictEventTypesTo }),
    }),
  );

  return (
    <div>
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

      {data?.map((item, i) => (
        <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseFeed() {
  return (
    <>
      <h1>
        <code>useFeed</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <UseFeedInner profile={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
