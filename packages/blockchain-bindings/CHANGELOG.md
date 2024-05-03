# @lens-protocol/blockchain-bindings

## 0.10.2

### Patch Changes

- Updated dependencies [b1e474862]
- Updated dependencies [1e6b96c67]
  - @lens-protocol/domain@0.12.0

## 0.10.1

### Patch Changes

- Updated dependencies [ce997e7fd]
  - @lens-protocol/shared-kernel@0.12.0
  - @lens-protocol/domain@0.11.1

## 0.10.0

This is a stable release, marking the closure of the alpha prerelease.

## 0.10.0-alpha.28

### Patch Changes

- Updated dependencies [880fb5de3]
  - @lens-protocol/domain@0.11.0-alpha.27

## 0.10.0-alpha.27

### Minor Changes

- cdaf25268: **feat:** added `useSignFrameAction` hook
  **feat:** added `useIdentityToken` hook

### Patch Changes

- 4183f686a: **chore:** exported missing gql types
- Updated dependencies [cdaf25268]
  - @lens-protocol/domain@0.11.0-alpha.26

## 0.10.0-alpha.26

### Patch Changes

- Updated dependencies [177879d07]
  - @lens-protocol/shared-kernel@0.11.0-alpha.12
  - @lens-protocol/domain@0.11.0-alpha.25

## 0.10.0-alpha.25

### Patch Changes

- Updated dependencies [8869b5819]
  - @lens-protocol/domain@0.11.0-alpha.24

## 0.10.0-alpha.24

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

- Updated dependencies [a98f6ad4e]
- Updated dependencies [5ecead02d]
- Updated dependencies [6fdfe12bc]
  - @lens-protocol/domain@0.11.0-alpha.23
  - @lens-protocol/shared-kernel@0.11.0-alpha.11

## 0.10.0-alpha.23

### Patch Changes

- Updated dependencies [9691cdccc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.10
  - @lens-protocol/domain@0.11.0-alpha.22

## 0.10.0-alpha.22

### Patch Changes

- 9c7fd3ee3: **feat:** `useCreateProfile` hook
- Updated dependencies [9c7fd3ee3]
  - @lens-protocol/domain@0.11.0-alpha.21

## 0.10.0-alpha.21

### Minor Changes

- 9aa0fb780: **chore:** unified implementation and naming of `isValidHandle` helper among react and client SDKs. deprecated `isValidProfileHandle` in the client sdk.
  **feat:** added `useValidateHandle` hook

## 0.10.0-alpha.20

### Patch Changes

- eb6a8f07c: **feat:** `useCreatePost` takes Open Action Modules Metadata into consideration when determining sponsored/signless experience
- Updated dependencies [a3b29e541]
- Updated dependencies [aa6669306]
- Updated dependencies [eb6a8f07c]
- Updated dependencies [79068cd37]
  - @lens-protocol/domain@0.11.0-alpha.20

## 0.10.0-alpha.19

### Patch Changes

- 1a97c390a: **chore:** Removed peer dependency on ethers@5
- 6a4df1bdb: **feat:** support Unknown Follow Modules
- Updated dependencies [1a97c390a]
- Updated dependencies [b647eab70]
  - @lens-protocol/shared-kernel@0.11.0-alpha.9
  - @lens-protocol/domain@0.11.0-alpha.19

## 0.10.0-alpha.18

### Patch Changes

- Updated dependencies [dd2f7d246]
- Updated dependencies [21c643d0c]
- Updated dependencies [78d95a3d0]
  - @lens-protocol/domain@0.11.0-alpha.18

## 0.10.0-alpha.17

### Patch Changes

- Updated dependencies [d255b3627]
- Updated dependencies [dd5088811]
- Updated dependencies [c6da5071d]
- Updated dependencies [b8279c3bd]
  - @lens-protocol/domain@0.11.0-alpha.17

## 0.10.0-alpha.16

### Patch Changes

- Updated dependencies [2becf4650]
- Updated dependencies [336c19f09]
- Updated dependencies [9b0ad4a1a]
  - @lens-protocol/domain@0.11.0-alpha.16

## 0.10.0-alpha.15

### Patch Changes

- Updated dependencies [493895b8]
- Updated dependencies [fdd0073d]
- Updated dependencies [5d243a83]
- Updated dependencies [b37f6f4e]
- Updated dependencies [2698fc65]
- Updated dependencies [6a25dc02]
- Updated dependencies [40abddd9]
  - @lens-protocol/domain@0.11.0-alpha.15

## 0.10.0-alpha.14

### Patch Changes

- Updated dependencies [5c429a0d7]
  - @lens-protocol/domain@0.11.0-alpha.14

## 0.10.0-alpha.13

### Patch Changes

- d71f981cc: **chore:** simplifies useApproveModule implementation
- c9b5c8d88: **feat:** seamless support for public collect/act in `useOpenAction`
- Updated dependencies [d71f981cc]
- Updated dependencies [c9b5c8d88]
  - @lens-protocol/shared-kernel@0.11.0-alpha.8
  - @lens-protocol/domain@0.11.0-alpha.13

## 0.10.0-alpha.12

### Patch Changes

- Updated dependencies [2f5360796]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7
  - @lens-protocol/domain@0.11.0-alpha.12

## 0.10.0-alpha.11

### Patch Changes

- Updated dependencies [cf250df4]
- Updated dependencies [1f28c6d6]
- Updated dependencies [9490db8e]
- Updated dependencies [cf250df4]
  - @lens-protocol/domain@0.11.0-alpha.11

## 0.10.0-alpha.10

### Patch Changes

- Updated dependencies [8120f676]
- Updated dependencies [8120f676]
- Updated dependencies [061df834]
- Updated dependencies [8120f676]
  - @lens-protocol/domain@0.11.0-alpha.10
  - @lens-protocol/shared-kernel@0.11.0-alpha.6

## 0.10.0-alpha.9

### Patch Changes

- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
  - @lens-protocol/domain@0.11.0-alpha.9

## 0.10.0-alpha.8

### Patch Changes

- Update dependencies
- Updated dependencies
  - @lens-protocol/domain@0.11.0-alpha.8

## 0.10.0-alpha.7

### Patch Changes

- Updated dependencies
  - @lens-protocol/domain@0.11.0-alpha.7

## 0.10.0-alpha.6

### Patch Changes

- Updated dependencies [cfc03dff]
- Updated dependencies [9481f48b]
  - @lens-protocol/domain@0.11.0-alpha.6
  - @lens-protocol/shared-kernel@0.11.0-alpha.5

## 0.10.0-alpha.5

### Patch Changes

- Updated dependencies [a42e90e7]
- Updated dependencies [9dd33b03]
  - @lens-protocol/domain@0.11.0-alpha.5

## 0.10.0-alpha.4

### Patch Changes

- Updated dependencies [a929c0f6]
- Updated dependencies [f82b90a5]
- Updated dependencies [5bc7e430]
- Updated dependencies [d1414eda]
- Updated dependencies [2f618240]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4
  - @lens-protocol/domain@0.11.0-alpha.4

## 0.10.0-alpha.3

### Patch Changes

- 734d6823: **feat:** adds `useProfileManagers` and `useUpdateProfileManagers` hooks
- Updated dependencies [734d6823]
- Updated dependencies [51f8cec6]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3
  - @lens-protocol/domain@0.11.0-alpha.3

## 0.10.0-alpha.2

### Patch Changes

- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2
  - @lens-protocol/domain@0.11.0-alpha.2

## 0.10.0-alpha.1

### Patch Changes

- Updated dependencies [25fe9a46]
  - @lens-protocol/domain@0.11.0-alpha.1
  - @lens-protocol/shared-kernel@0.11.0-alpha.1

## 0.10.0-alpha.0

### Minor Changes

- 731ff1d0: Added support for Lens Protocol v2

### Patch Changes

- Updated dependencies [731ff1d0]
  - @lens-protocol/shared-kernel@0.11.0-alpha.0
  - @lens-protocol/domain@0.11.0-alpha.0

## 0.9.2

### Patch Changes

- Updated dependencies [48dd0860]
  - @lens-protocol/domain@0.10.1

## 0.9.2-next.0

### Patch Changes

- Updated dependencies [48dd0860]
  - @lens-protocol/domain@0.10.1-next.0

## 0.9.1

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [3ffab7b9]
- Updated dependencies [0f75f79d]
- Updated dependencies [773c2ed8]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [9428efeb]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/domain@0.10.0
  - @lens-protocol/shared-kernel@0.10.0

## 0.9.1-next.7

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2
  - @lens-protocol/domain@0.10.0-next.7

## 0.9.1-next.6

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1
  - @lens-protocol/domain@0.10.0-next.6

## 0.9.1-next.5

### Patch Changes

- Updated dependencies [773c2ed8]
  - @lens-protocol/domain@0.10.0-next.5

## 0.9.1-next.4

### Patch Changes

- Updated dependencies [3ffab7b9]
  - @lens-protocol/domain@0.10.0-next.4

## 0.9.1-next.3

### Patch Changes

- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
  - @lens-protocol/domain@0.10.0-next.3
  - @lens-protocol/shared-kernel@0.10.0-next.0

## 0.9.1-next.2

### Patch Changes

- Updated dependencies [9428efeb]
  - @lens-protocol/domain@0.9.1-next.2

## 0.9.1-next.1

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
  - @lens-protocol/domain@0.9.1-next.1

## 0.9.1-next.0

### Patch Changes

- Updated dependencies [0f75f79d]
  - @lens-protocol/domain@0.9.1-next.0

## 0.9.0

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

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

- Updated dependencies [ea0b40e3]
  - @lens-protocol/domain@0.9.0-next.2

## 0.9.0-next.1

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

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

- c416a2e: **Added:** self-fund protocol calls when subsidized approaches fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings

### Patch Changes

- Updated dependencies [c416a2e]
- Updated dependencies [ef1d7e2]
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
- Updated dependencies [71196cf]
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/domain@0.8.0

## 0.8.0-next.3

### Patch Changes

- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.3

## 0.8.0-next.2

### Patch Changes

- Updated dependencies [ef1d7e2]
  - @lens-protocol/domain@0.8.0-next.2

## 0.8.0-next.1

### Patch Changes

- Updated dependencies [71196cf]
  - @lens-protocol/domain@0.8.0-next.1

## 0.8.0-next.0

### Minor Changes

- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings

### Patch Changes

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

- Updated dependencies [37eaf8a]
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/domain@0.7.0

## 0.7.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

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
