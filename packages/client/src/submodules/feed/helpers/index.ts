import { FollowPaidActionFragment, OpenActionPaidActionFragment } from '../graphql/feed.generated';

/**
 * Check if the result is a {@link FollowPaidActionFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link FollowPaidActionFragment}
 */
export function isFollowPaidAction(
  result: FollowPaidActionFragment | OpenActionPaidActionFragment,
): result is FollowPaidActionFragment {
  return '__typename' in result && result.__typename === 'FollowPaidAction';
}

/**
 * Check if the result is a {@link OpenActionPaidActionFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link OpenActionPaidActionFragment}
 */
export function isOpenActionPaidAction(
  result: FollowPaidActionFragment | OpenActionPaidActionFragment,
): result is OpenActionPaidActionFragment {
  return '__typename' in result && result.__typename === 'OpenActionPaidAction';
}
