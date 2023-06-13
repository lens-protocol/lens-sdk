export type FollowStatus = {
  /**
   * Whether the profile is followed by the authenticated wallet
   *
   * Use this property to show the user if they are following a given profile.
   *
   * It uses aggressive optimistic update strategies to avoid waiting for the blockchain to confirm the follow request.
   */
  isFollowedByMe: boolean;

  /**
   * Determines if the authenticated wallet can follow the profile
   *
   * Use this property to enable/disable the follow functionality for a given profile.
   *
   * It also accounts for any pending follow/unfollow requests and avoids to accidentally send
   * a follow request while a previous unfollow request is still pending.
   *
   */
  canFollow: boolean;

  /**
   * Determines if the authenticated wallet can unfollow the profile
   *
   * Use this property to enable/disable the unfollow functionality for a given profile.
   *
   * It also accounts for any pending follow/unfollow requests and avoids to accidentally send
   * an unfollow request while a previous follow request is still pending.
   */
  canUnfollow: boolean;
};
