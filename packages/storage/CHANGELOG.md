# @lens-protocol/storage

## 0.8.1

### Patch Changes

- Updated dependencies [ce997e7fd]
  - @lens-protocol/shared-kernel@0.12.0

## 0.8.0

This is a stable release, marking the closure of the alpha prerelease.

## 0.8.0-alpha.11

### Patch Changes

- Updated dependencies [177879d07]
  - @lens-protocol/shared-kernel@0.11.0-alpha.12

## 0.8.0-alpha.10

### Minor Changes

- 5ecead02d: **breaking:** Remove all what was marked as deprecated. See the detailed list below. Prepare for the major release.

  React SDKs:

  - removed `NoFeeFollowPolicy`, use `NoFollowPolicy` instead
  - removed from fragments: `followModuleReturnData`, `referenceModuleReturnData`, `openActionModuleReturnData`
  - removed `useMyBookmarks`, use `useBookmarks` instead

  Client SDK:

  - removed from `LensClientConfig`:

    - `mediaTransforms`, use the `params` option instead.
    - `origin`, use the `headers` option instead

  - removed from fragments:

    - `followModuleReturnData`, `referenceModuleReturnData`, `openActionModuleReturnData`
    - `image.transformed`, use `image.small`, `image.medium` or `image.thumbnail` instead
    - `upvoteReactions`, `downvoteReactions`, `upvoteReacted`, `downvoteReacted`, use `upvotes`, `downvotes`, `upvoted`, `downvoted` instead

  - removed `nfts.ownershipChallenge`
  - removed `isValidProfileHandle`, use `isValidHandle` instead

### Patch Changes

- Updated dependencies [5ecead02d]
- Updated dependencies [6fdfe12bc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.11

## 0.7.5-alpha.9

### Patch Changes

- Updated dependencies [9691cdccc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.10

## 0.7.5-alpha.8

### Patch Changes

- Updated dependencies [1a97c390a]
- Updated dependencies [b647eab70]
  - @lens-protocol/shared-kernel@0.11.0-alpha.9

## 0.7.5-alpha.7

### Patch Changes

- 9b0ad4a1a: **fix:** Added session revoke on logout + more logout improvements
- f2010c008: **fix:** `LensClient` and Lens React Hooks interoperability

## 0.7.5-alpha.6

### Patch Changes

- Updated dependencies [d71f981cc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.8

## 0.7.5-alpha.5

### Patch Changes

- Updated dependencies [2f5360796]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7

## 0.7.5-alpha.4

### Patch Changes

- Updated dependencies [061df834]
  - @lens-protocol/shared-kernel@0.11.0-alpha.6

## 0.7.5-alpha.3

### Patch Changes

- Updated dependencies [9481f48b]
  - @lens-protocol/shared-kernel@0.11.0-alpha.5

## 0.7.5-alpha.2

### Patch Changes

- Updated dependencies [a929c0f6]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4

## 0.7.5-alpha.1

### Patch Changes

- Updated dependencies [734d6823]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3

## 0.7.5-alpha.0

### Patch Changes

- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2

## 0.7.4

### Patch Changes

- Updated dependencies [fc31f146]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/shared-kernel@0.10.0

## 0.7.4-next.2

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2

## 0.7.4-next.1

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1

## 0.7.4-next.0

### Patch Changes

- Updated dependencies [fc31f146]
  - @lens-protocol/shared-kernel@0.10.0-next.0

## 0.7.3

### Patch Changes

- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0

## 0.7.3-next.0

### Patch Changes

- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0-next.0

## 0.7.2

### Patch Changes

- Updated dependencies [c416a2e]
- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0

## 0.7.2-next.1

### Patch Changes

- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0-next.1

## 0.7.2-next.0

### Patch Changes

- Updated dependencies [c416a2ea]
  - @lens-protocol/shared-kernel@0.8.0-next.0

## 0.7.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/shared-kernel@0.7.1

## 0.7.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [37eaf8a]
  - @lens-protocol/shared-kernel@0.7.0

## 0.7.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [dc1350d]
  - @lens-protocol/shared-kernel@0.7.0-beta.0

## 0.6.0

### Patch Changes

- @lens-protocol/shared-kernel@0.6.0

## 0.5.1

### Patch Changes

- @lens-protocol/shared-kernel@0.5.1

## 0.5.0

### Patch Changes

- @lens-protocol/shared-kernel@0.5.0

## 0.4.1

### Patch Changes

- @lens-protocol/shared-kernel@0.4.1

## 0.4.0

### Patch Changes

- @lens-protocol/shared-kernel@0.4.0

## 0.3.0

### Patch Changes

- @lens-protocol/shared-kernel@0.3.0

## 0.2.0

### Patch Changes

- Updated dependencies [c89aed9]
  - @lens-protocol/shared-kernel@1.0.0

## 0.1.1

### Patch Changes

- @lens-protocol/shared-kernel@0.1.1

## 0.1.0

First developer preview release
