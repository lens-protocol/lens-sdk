# @lens-protocol/react

## 0.2.0

### Minor Changes

- 930d252: Added `useSearchProfiles` and `useSearchPublications` hooks
- 7b8e3f8: Added `useWhoReacted` hook
- c6a168e: Added `useCreateComment` hook
- 4e2b448: Added `useExplorePublications` hook
- 5f46cde: Added `useUnfollow` hook
- c89aed9: Added `useFollow` hook
- 1c607e2: Added `usePublicationRevenue` hook
- 2054ad6: Added `useProfileFollowRevenue` hook
- a921c32: Added `useReaction` hook

### Patch Changes

- Updated dependencies [930d252]
- Updated dependencies [7b8e3f8]
- Updated dependencies [4e2b448]
- Updated dependencies [5f46cde]
- Updated dependencies [c89aed9]
- Updated dependencies [1c607e2]
- Updated dependencies [a921c32]
  - @lens-protocol/api-bindings@1.0.0
  - @lens-protocol/blockchain-bindings@1.0.0
  - @lens-protocol/shared-kernel@1.0.0
  - @lens-protocol/domain@1.0.0
  - @lens-protocol/storage@1.0.0

## 0.1.1

### Patch Changes

- e8c5846: Fixes @lens-protocol/react/web exports config.
  - @lens-protocol/api-bindings@0.1.1
  - @lens-protocol/domain@0.1.1
  - @lens-protocol/shared-kernel@0.1.1
  - @lens-protocol/storage@0.1.1

## 0.1.0

First developer preview release

- feat: authentication w/ transparent token renewal
- feat: React Hooks to:
  - fetch publications
  - fetch profiles
  - fetch followers/following
  - create post
  - fetch feed
  - notifications
