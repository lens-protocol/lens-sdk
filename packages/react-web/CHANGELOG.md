# @lens-protocol/react-web

## 1.3.0-next.6

### Minor Changes

- 3ffab7b9: **Added** newly created `Profile` to `useCreateProfile` result
- 19ed489e: **Added** `beforeCount` to all paginated hooks and refetch data on re-render of `usePublication` and `useProfile` hooks.
- 6eaaaf22: **Added** `Profile.followNftAddress` field

### Patch Changes

- Updated dependencies [3ffab7b9]
- Updated dependencies [19ed489e]
- Updated dependencies [6eaaaf22]
  - @lens-protocol/react@1.3.0-next.6
  - @lens-protocol/domain@0.10.0-next.4
  - @lens-protocol/api-bindings@0.10.0-next.5
  - @lens-protocol/gated-content@0.3.2-next.5

## 1.3.0-next.5

### Minor Changes

- 433760f3: **Added** ability to specify profile picture and follow policy when creating a new profile"
- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk

### Patch Changes

- b7609fcb: **Fixed** `useNotification` to include `highSignalFilter` filter
- Updated dependencies [b7609fcb]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [e8dc3cd8]
  - @lens-protocol/api-bindings@0.10.0-next.4
  - @lens-protocol/react@1.3.0-next.5
  - @lens-protocol/domain@0.10.0-next.3
  - @lens-protocol/shared-kernel@0.10.0-next.0
  - @lens-protocol/gated-content@0.3.2-next.4
  - @lens-protocol/storage@0.7.4-next.0

## 1.3.0-next.4

### Minor Changes

- 9428efeb: **Added** support for `attributes` and `image` for non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`

### Patch Changes

- Updated dependencies [9428efeb]
  - @lens-protocol/react@1.3.0-next.4
  - @lens-protocol/api-bindings@0.10.0-next.3
  - @lens-protocol/gated-content@0.3.2-next.3

## 1.3.0-next.3

### Minor Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook
- 636ff014: **Added** `profileIds` to `usePublications` hook
- 3b67207b: **Added** `appId` to `Comment` and `Post`

### Patch Changes

- 125ec30c: **Fixed** `usePollDetails` to be robust to flagged or misconfigured Snapshot Proposals
- Updated dependencies [de401a59]
- Updated dependencies [a5cf2198]
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [636ff014]
- Updated dependencies [125ec30c]
- Updated dependencies [3b67207b]
  - @lens-protocol/api-bindings@0.10.0-next.2
  - @lens-protocol/react@1.3.0-next.3
  - @lens-protocol/gated-content@0.3.2-next.2

## 1.3.0-next.2

### Patch Changes

- Updated dependencies [df70461c]
- Updated dependencies [1d13a3ab]
  - @lens-protocol/react@1.3.0-next.2

## 1.3.0-next.1

### Patch Changes

- Updated dependencies [d5efd895]
  - @lens-protocol/api-bindings@0.9.2-next.1
  - @lens-protocol/gated-content@0.3.2-next.1
  - @lens-protocol/react@1.3.0-next.1

## 1.2.2

### Patch Changes

- Updated dependencies [06a30a2c]
  - @lens-protocol/api-bindings@0.9.1
  - @lens-protocol/gated-content@0.3.1
  - @lens-protocol/react@1.2.2

## 1.3.0-next.0

### Minor Changes

- c2a91ef4: **Added** `Profile.invitedBy` field
- cfe0d51e: **Added** `highSignalFilter` to `useNotifications` hook
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- 4c4505d2: **Added** support for Profile Guardian

### Patch Changes

- Updated dependencies [c8426cb3]
- Updated dependencies [c2a91ef4]
- Updated dependencies [cfe0d51e]
- Updated dependencies [0f75f79d]
- Updated dependencies [847a9db3]
- Updated dependencies [4c4505d2]
  - @lens-protocol/react@1.3.0-next.0
  - @lens-protocol/api-bindings@0.9.1-next.0
  - @lens-protocol/gated-content@0.3.1-next.0

## 1.2.1

### Patch Changes

- Updated dependencies [6be8cfb6]
  - @lens-protocol/react@1.2.1

## 1.2.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support
- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- Updated dependencies [cb5b900d]
- Updated dependencies [af4b1133]
- Updated dependencies [55211083]
- Updated dependencies [3025d56a]
- Updated dependencies [422c627e]
- Updated dependencies [1d99413a]
- Updated dependencies [225f0fa7]
- Updated dependencies [ea0b40e3]
- Updated dependencies [a899553c]
- Updated dependencies [422c627e]
- Updated dependencies [2dbe0035]
- Updated dependencies [148e9636]
- Updated dependencies [e4be6c07]
- Updated dependencies [97ecba69]
  - @lens-protocol/gated-content@0.3.0
  - @lens-protocol/react@1.2.0
  - @lens-protocol/api-bindings@0.9.0
  - @lens-protocol/shared-kernel@0.9.0
  - @lens-protocol/storage@0.7.3

## 1.2.0-next.4

### Patch Changes

- Updated dependencies [ea0b40e3]
- Updated dependencies [a899553c]
  - @lens-protocol/react@1.2.0-next.4
  - @lens-protocol/api-bindings@0.9.0-next.2
  - @lens-protocol/gated-content@0.3.0-next.4

## 1.1.1

### Patch Changes

- Updated dependencies [58217985]
  - @lens-protocol/api-bindings@0.8.1
  - @lens-protocol/gated-content@0.2.3
  - @lens-protocol/react@1.1.1

## 1.2.0-next.3

### Patch Changes

- Updated dependencies [2dbe0035]
  - @lens-protocol/gated-content@0.3.0-next.3
  - @lens-protocol/react@1.2.0-next.3

## 1.2.0-next.2

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- Updated dependencies [3025d56a]
- Updated dependencies [422c627e]
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
- Updated dependencies [97ecba69]
  - @lens-protocol/api-bindings@0.9.0-next.1
  - @lens-protocol/react@1.2.0-next.2
  - @lens-protocol/shared-kernel@0.9.0-next.0
  - @lens-protocol/gated-content@0.3.0-next.2
  - @lens-protocol/storage@0.7.3-next.0

## 1.2.0-next.1

### Patch Changes

- Updated dependencies [55211083]
- Updated dependencies [148e9636]
  - @lens-protocol/react@1.2.0-next.1
  - @lens-protocol/gated-content@0.3.0-next.1
  - @lens-protocol/api-bindings@0.8.1-next.0

## 1.2.0-next.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support

### Patch Changes

- Updated dependencies [cb5b900d]
- Updated dependencies [af4b1133]
  - @lens-protocol/gated-content@0.3.0-next.0
  - @lens-protocol/react@1.2.0-next.0

## 1.1.0

### Minor Changes

- cf4a420: **Added** support for cover and `altTag` in publication media attributes

### Patch Changes

- 72becec: **Fixed** documentation for `useuseActiveProfileSwitch` and `useProfilesOwnedByMe` hooks
- b738abb: **Fixed** `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- Updated dependencies [1d5cf31]
- Updated dependencies [03a8ad5]
- Updated dependencies [37bf8e8]
- Updated dependencies [72becec]
- Updated dependencies [ca9b8cb]
- Updated dependencies [513373d]
- Updated dependencies [98c6547]
- Updated dependencies [04647bb]
- Updated dependencies [c416a2e]
- Updated dependencies [cf4a420]
- Updated dependencies [ef1d7e2]
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
- Updated dependencies [71196cf]
- Updated dependencies [c4e6fcf]
  - @lens-protocol/react@1.1.0
  - @lens-protocol/api-bindings@0.8.0
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/gated-content@0.2.2
  - @lens-protocol/storage@0.7.2

## 1.1.0-next.5

### Patch Changes

- Updated dependencies [37bf8e8]
  - @lens-protocol/api-bindings@0.8.0-next.4
  - @lens-protocol/gated-content@0.2.2-next.4
  - @lens-protocol/react@1.1.0-next.5

## 1.1.0-next.4

### Patch Changes

- b738abb: Fixed `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/react@1.1.0-next.4
  - @lens-protocol/api-bindings@0.8.0-next.3
  - @lens-protocol/gated-content@0.2.2-next.3
  - @lens-protocol/storage@0.7.2-next.1

## 1.1.0-next.3

### Patch Changes

- Updated dependencies [1d5cf31]
  - @lens-protocol/react@1.1.0-next.3

## 1.1.0-next.2

### Patch Changes

- Updated dependencies [ef1d7e2]
  - @lens-protocol/api-bindings@0.8.0-next.2
  - @lens-protocol/react@1.1.0-next.2
  - @lens-protocol/gated-content@0.2.2-next.2

## 1.1.0-next.1

### Patch Changes

- Updated dependencies [03a8ad5]
- Updated dependencies [ca9b8cb]
- Updated dependencies [71196cf]
  - @lens-protocol/api-bindings@0.8.0-next.1
  - @lens-protocol/react@1.1.0-next.1
  - @lens-protocol/gated-content@0.2.2-next.1

## 1.1.0-next.0

### Minor Changes

- cf4a4201: Added support for cover and `altTag` in publication media attributes

### Patch Changes

- 72becec0: **Fixed** documentation for `useuseActiveProfileSwitch` and `useProfilesOwnedByMe` hooks
- Updated dependencies [72becec0]
- Updated dependencies [513373d3]
- Updated dependencies [04647bbe]
- Updated dependencies [c416a2ea]
- Updated dependencies [cf4a4201]
- Updated dependencies [c4e6fcfc]
  - @lens-protocol/react@1.1.0-next.0
  - @lens-protocol/api-bindings@0.8.0-next.0
  - @lens-protocol/shared-kernel@0.8.0-next.0
  - @lens-protocol/gated-content@0.2.2-next.0
  - @lens-protocol/storage@0.7.2-next.0

## 1.0.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/api-bindings@0.7.1
  - @lens-protocol/gated-content@0.2.1
  - @lens-protocol/react@1.0.1
  - @lens-protocol/shared-kernel@0.7.1
  - @lens-protocol/storage@0.7.1

## 1.0.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 520a7c1: Changed GQL generated types so that Fragment suffix is no longer necessary
  - Added several missing TS type definitions
  - Added TSDoc comments to several APIs
- 0f20b5a: Changed storage keys so use environment name as namespace
- 0f20b5a: Changed env config variables to be `development` and `production`
- Updated dependencies [fce5b18]
- Updated dependencies [520a7c1]
- Updated dependencies [6ae90ef]
- Updated dependencies [c5dd99b]
- Updated dependencies [0f20b5a]
- Updated dependencies [006aff5]
- Updated dependencies [37eaf8a]
- Updated dependencies [0f20b5a]
- Updated dependencies [a4e9500]
  - @lens-protocol/react@1.0.0
  - @lens-protocol/api-bindings@0.7.0
  - @lens-protocol/gated-content@0.2.0
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/storage@0.7.0

## 1.0.0-beta.1

### Patch Changes

- 0f20b5a: Changed storage keys so use environment name as namespace
- 0f20b5a: Changed env config variables to be `development` and `production`
- Updated dependencies [0f20b5a]
- Updated dependencies [0f20b5a]
  - @lens-protocol/gated-content@0.2.0-beta.1
  - @lens-protocol/react@1.0.0-beta.1

## 1.0.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 520a7c1: Changed GQL generated types so that `Fragment` suffix is no longer necessary
  Added several missing TS type definitions
  Added TSDoc comments to several APIs
- Updated dependencies [fce5b18]
- Updated dependencies [520a7c1]
- Updated dependencies [6ae90ef]
- Updated dependencies [c5dd99b]
- Updated dependencies [006aff5]
- Updated dependencies [dc1350d]
- Updated dependencies [a4e9500]
  - @lens-protocol/react@1.0.0-beta.0
  - @lens-protocol/api-bindings@0.7.0-beta.0
  - @lens-protocol/gated-content@0.2.0-beta.0
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/storage@0.7.0-beta.0

## 0.6.0

### Minor changes

- 6be7f14: Added this package out of `@lens-protocol/react` as the canonical integration in the Rect web apps. Includes support for token-gated via WebCrypto API.

### Patch Changes

- Updated dependencies
- Updated dependencies [4475a27]
  - @lens-protocol/react@0.6.0
  - @lens-protocol/api-bindings@0.6.0
  - @lens-protocol/gated-content@0.0.2
  - @lens-protocol/storage@0.6.0
  - @lens-protocol/shared-kernel@0.6.0
