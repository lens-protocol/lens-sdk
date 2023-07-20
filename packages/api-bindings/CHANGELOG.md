# @lens-protocol/api-bindings

## 0.9.2-next.1

### Patch Changes

- d5efd895: **Fixed** crash caused by token-gated mismatch of publication author access condition"

## 0.9.1

### Patch Changes

- 06a30a2c: **Fixed** crash caused by token-gated mismatch of publication author access condition"

## 0.9.1-next.0

### Patch Changes

- c2a91ef4: **Added** `Profile.invitedBy` field
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- 4c4505d2: **Added** support for Profile Guardian
- Updated dependencies [0f75f79d]
  - @lens-protocol/domain@0.9.1-next.0

## 0.9.0

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 3025d56a: allow self funded fallback for proxy actions
- a899553c: **Fixed** missing cache item that causes logged out flow to not work as expected
- e4be6c07: **Updated** min Lens API supported version.
- 97ecba69: **Fixed** cache redirects for Publication and Profile
- Updated dependencies [55211083]
- Updated dependencies [3025d56a]
- Updated dependencies [1d99413a]
- Updated dependencies [225f0fa7]
- Updated dependencies [ea0b40e3]
- Updated dependencies [422c627e]
  - @lens-protocol/domain@0.9.0
  - @lens-protocol/shared-kernel@0.9.0

## 0.9.0-next.2

### Patch Changes

- a899553c: **Fixed** missing cache item that causes logged out flow to not work as expected
- Updated dependencies [ea0b40e3]
  - @lens-protocol/domain@0.9.0-next.2

## 0.8.1

### Patch Changes

- 58217985: **Fixed** missing cache item that causes logged out flow to not work as expected

## 0.9.0-next.1

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 3025d56a: allow self funded fallback for proxy actions
- 97ecba69: **Fixed** cache redirects for Publication and Profile
- Updated dependencies [3025d56a]
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/domain@0.9.0-next.1
  - @lens-protocol/shared-kernel@0.9.0-next.0

## 0.8.1-next.0

### Patch Changes

- Updated dependencies [55211083]
  - @lens-protocol/domain@0.8.1-next.0

## 0.8.0

### Minor Changes

- 03a8ad5: **Deprecated** publication's `isOptimisticMirroredByMe` property, introduced `isMirroredByMe`
- 513373d: **Enhanced** publication's `hasCollectedByMe` to replace deprecated `hasOptimisticCollectedByMe` property
- 98c6547: **Added:** support to fetch results before the current results set
- c416a2e: **Added:** self-fund protocol calls when subsidized approaches fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings
- ef1d7e2: **Added:** Momoka support to React hooks
- 5c5bfb2: **Added:** support for SimpleCollectModule

### Patch Changes

- 37bf8e8: Do not fallback to `undefined` with unsupported collect module in collect policy
- 04647bb: **Fixed** issue preventing query hook from detecting active profile changes
- Updated dependencies [c416a2e]
- Updated dependencies [ef1d7e2]
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
- Updated dependencies [71196cf]
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/domain@0.8.0

## 0.8.0-next.4

### Patch Changes

- 37bf8e8: Do not fallback to `undefined` with unsupported collect module in collect policy

## 0.8.0-next.3

### Minor Changes

- 5c5bfb2: Added support for SimpleCollectModule

### Patch Changes

- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.3

## 0.8.0-next.2

### Minor Changes

- ef1d7e2: Added Momoka support to React hooks

### Patch Changes

- Updated dependencies [ef1d7e2]
  - @lens-protocol/domain@0.8.0-next.2

## 0.8.0-next.1

### Minor Changes

- 03a8ad5: Deprecated publication's `isOptimisticMirroredByMe` property, introduced `isMirroredByMe`

### Patch Changes

- Updated dependencies [71196cf]
  - @lens-protocol/domain@0.8.0-next.1

## 0.8.0-next.0

### Minor Changes

- 513373d3: Enhanced publication's hasCollectedByMe to replace deprecated hasOptimisticCollectedByMe property
- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings

### Patch Changes

- 04647bbe: **Fixed** issue preventing query hook from detecting active profile changes
- Updated dependencies [c416a2ea]
  - @lens-protocol/shared-kernel@0.8.0-next.0
  - @lens-protocol/domain@0.8.0-next.0

## 0.7.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/domain@0.7.1
  - @lens-protocol/shared-kernel@0.7.1

## 0.7.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 6ae90ef: Exposed collectNftAddress from publication fragments
- a4e9500: allow to define sortCriteria for useExploreProfiles
- Updated dependencies [37eaf8a]
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/domain@0.7.0

## 0.7.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 6ae90ef: Exposed `collectNftAddress` from publication fragments
- a4e9500: allow to define `sortCriteria` for `useExploreProfiles`
- Updated dependencies [dc1350d]
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/domain@0.7.0-beta.0

## 0.6.0

### Patch Changes

- Updated dependencies [4475a27]
  - @lens-protocol/domain@0.6.0
  - @lens-protocol/shared-kernel@0.6.0

## 0.5.1

### Patch Changes

- @lens-protocol/domain@0.5.1
- @lens-protocol/shared-kernel@0.5.1

## 0.5.0

### Patch Changes

- @lens-protocol/domain@0.5.0
- @lens-protocol/shared-kernel@0.5.0

## 0.4.1

### Patch Changes

- @lens-protocol/domain@0.4.1
- @lens-protocol/shared-kernel@0.4.1

## 0.4.0

### Patch Changes

- @lens-protocol/domain@0.4.0
- @lens-protocol/shared-kernel@0.4.0

## 0.3.0

### Patch Changes

- @lens-protocol/domain@0.3.0
- @lens-protocol/shared-kernel@0.3.0

## 0.2.0

### Patch Changes

- Updated dependencies [c89aed9]
- Updated dependencies [a921c32]
  - @lens-protocol/shared-kernel@1.0.0
  - @lens-protocol/domain@1.0.0

## 0.1.1

### Patch Changes

- @lens-protocol/domain@0.1.1
- @lens-protocol/shared-kernel@0.1.1

## 0.1.0

First developer preview release
