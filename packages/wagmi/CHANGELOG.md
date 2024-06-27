# @lens-protocol/wagmi

## 4.1.4

### Patch Changes

- Updated dependencies [73c1bfebe]
- Updated dependencies [7f080c11b]
  - @lens-protocol/react-web@2.3.1

## 4.1.3

### Patch Changes

- Updated dependencies [21f652d22]
- Updated dependencies [d8b19df55]
- Updated dependencies [53071caf2]
- Updated dependencies [032c71c3d]
- Updated dependencies [3ffa19856]
- Updated dependencies [1f34162dc]
- Updated dependencies [980e3271c]
- Updated dependencies [697eca13a]
- Updated dependencies [b1cb9e78c]
- Updated dependencies [46a648de2]
- Updated dependencies [fcd04e356]
  - @lens-protocol/react-web@2.3.0

## 4.1.2

### Patch Changes

- Updated dependencies [8d4e958e0]
- Updated dependencies [8bc1cf3ba]
- Updated dependencies [2edd76361]
- Updated dependencies [b1e474862]
- Updated dependencies [0d9bd97bd]
- Updated dependencies [1e6b96c67]
  - @lens-protocol/react-web@2.2.0

## 4.1.1

### Patch Changes

- Updated dependencies [577b6457e]
- Updated dependencies [0c3d24594]
  - @lens-protocol/react-web@2.1.1

## 4.1.0

### Minor Changes

- ce997e7fd: **chore:** updated development environment to Amoy testnet

### Patch Changes

- Updated dependencies [10757c9cf]
- Updated dependencies [1d99b37c9]
- Updated dependencies [05b23041f]
- Updated dependencies [ce997e7fd]
- Updated dependencies [8af3e82ac]
  - @lens-protocol/react-web@2.1.0
  - @lens-protocol/shared-kernel@0.12.0

## 4.0.0

This is a stable release, marking the closure of the alpha prerelease.

## 4.0.0-alpha.7

### Patch Changes

- Updated dependencies [8dcaeda61]
- Updated dependencies [880fb5de3]
  - @lens-protocol/react-web@2.0.0-alpha.38

## 4.0.0-alpha.6

### Patch Changes

- Updated dependencies [cdaf25268]
- Updated dependencies [dbb1657e3]
- Updated dependencies [95f361c8b]
- Updated dependencies [69c04be1d]
- Updated dependencies [4183f686a]
  - @lens-protocol/react-web@2.0.0-alpha.37

## 4.0.0-alpha.5

### Patch Changes

- Updated dependencies [177879d07]
- Updated dependencies [54f0be643]
- Updated dependencies [f95ed6f5a]
- Updated dependencies [8fbfdc9d4]
- Updated dependencies [840208f26]
  - @lens-protocol/react-web@2.0.0-alpha.36
  - @lens-protocol/shared-kernel@0.11.0-alpha.12

## 4.0.0-alpha.4

### Patch Changes

- Updated dependencies [8869b5819]
- Updated dependencies [36a077785]
- Updated dependencies [0e9de6f2a]
  - @lens-protocol/react-web@2.0.0-alpha.35

## 4.0.0-alpha.3

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
- Updated dependencies [9a7edace3]
- Updated dependencies [5ecead02d]
- Updated dependencies [71a668156]
- Updated dependencies [6c75a89e8]
- Updated dependencies [9a7edace3]
- Updated dependencies [6fdfe12bc]
- Updated dependencies [9a7edace3]
- Updated dependencies [f71cff84b]
- Updated dependencies [71a668156]
- Updated dependencies [7cd6bad82]
- Updated dependencies [87f6da539]
  - @lens-protocol/react-web@2.0.0-alpha.34
  - @lens-protocol/shared-kernel@0.11.0-alpha.11

## 4.0.0-alpha.2

### Patch Changes

- Updated dependencies [9691cdccc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.10
  - @lens-protocol/react-web@2.0.0-alpha.33

## 4.0.0-alpha.1

### Patch Changes

- Updated dependencies [7b1cbde5d]
  - @lens-protocol/react-web@2.0.0-alpha.32

## 4.0.0-alpha.0

### Major Changes

- 8279f5b14: **feat:** Wagmi v2 support

### Patch Changes

- Updated dependencies [da4c26e34]
- Updated dependencies [66c6df157]
- Updated dependencies [9c7fd3ee3]
  - @lens-protocol/react-web@2.0.0-alpha.31

## 3.0.0-alpha.27

### Patch Changes

- Updated dependencies [9aa0fb780]
- Updated dependencies [bd5a1da6a]
  - @lens-protocol/react-web@2.0.0-alpha.30

## 3.0.0-alpha.26

### Patch Changes

- Updated dependencies [a3b29e541]
- Updated dependencies [a3b29e541]
- Updated dependencies [a58d45417]
- Updated dependencies [aa6669306]
- Updated dependencies [eb6a8f07c]
- Updated dependencies [79068cd37]
  - @lens-protocol/react-web@2.0.0-alpha.29

## 3.0.0-alpha.25

### Patch Changes

- 1a97c390a: **chore:** Removed peer dependency on ethers@5
- Updated dependencies [bb9a8dd7b]
- Updated dependencies [1a97c390a]
- Updated dependencies [821d8c492]
- Updated dependencies [c2b05bdf0]
- Updated dependencies [b647eab70]
- Updated dependencies [74751f359]
- Updated dependencies [c2b05bdf0]
- Updated dependencies [c2b05bdf0]
- Updated dependencies [6a4df1bdb]
- Updated dependencies [c2b05bdf0]
  - @lens-protocol/react-web@2.0.0-alpha.28
  - @lens-protocol/shared-kernel@0.11.0-alpha.9

## 3.0.0-alpha.24

### Patch Changes

- Updated dependencies [481e1d7aa]
- Updated dependencies [c074c4ded]
- Updated dependencies [fa944c274]
  - @lens-protocol/react-web@2.0.0-alpha.27

## 3.0.0-alpha.23

### Patch Changes

- f8db5595f: Upgraded wagmi dependency
- Updated dependencies [dd2f7d246]
- Updated dependencies [a21256702]
- Updated dependencies [750767231]
- Updated dependencies [21c643d0c]
- Updated dependencies [78d95a3d0]
  - @lens-protocol/react-web@2.0.0-alpha.26

## 3.0.0-alpha.22

### Patch Changes

- Updated dependencies [daf688200]
- Updated dependencies [d255b3627]
- Updated dependencies [dd5088811]
- Updated dependencies [c6da5071d]
  - @lens-protocol/react-web@2.0.0-alpha.25

## 3.0.0-alpha.21

### Patch Changes

- Updated dependencies [9b0ad4a1a]
- Updated dependencies [dd2ab15a5]
- Updated dependencies [f2010c008]
  - @lens-protocol/react-web@2.0.0-alpha.24

## 3.0.0-alpha.20

### Patch Changes

- Updated dependencies [acfad683]
- Updated dependencies [493895b8]
- Updated dependencies [1c24ae00]
- Updated dependencies [acfad683]
- Updated dependencies [fdd0073d]
- Updated dependencies [5d243a83]
- Updated dependencies [b29efcb2]
- Updated dependencies [b37f6f4e]
- Updated dependencies [2e351a8c]
- Updated dependencies [2698fc65]
- Updated dependencies [6a25dc02]
- Updated dependencies [40abddd9]
- Updated dependencies [d0bad262]
  - @lens-protocol/react-web@2.0.0-alpha.23

## 3.0.0-alpha.19

### Patch Changes

- Updated dependencies [89f345ba6]
  - @lens-protocol/react-web@2.0.0-alpha.22

## 3.0.0-alpha.18

### Patch Changes

- Updated dependencies [4166f51f8]
- Updated dependencies [5c429a0d7]
  - @lens-protocol/react-web@2.0.0-alpha.21

## 3.0.0-alpha.17

### Patch Changes

- Updated dependencies [ac17aa775]
- Updated dependencies [d6a8061e8]
- Updated dependencies [3bf2e33dc]
- Updated dependencies [d71f981cc]
- Updated dependencies [c9b5c8d88]
  - @lens-protocol/react-web@2.0.0-alpha.20
  - @lens-protocol/shared-kernel@0.11.0-alpha.8

## 3.0.0-alpha.16

### Patch Changes

- Updated dependencies [2f5360796]
- Updated dependencies [3a9720968]
- Updated dependencies [5d95eccd2]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7
  - @lens-protocol/react-web@2.0.0-alpha.19

## 3.0.0-alpha.15

### Patch Changes

- Updated dependencies [a4e191700]
  - @lens-protocol/react-web@2.0.0-alpha.18

## 3.0.0-alpha.14

### Patch Changes

- Updated dependencies [0a7b26ff]
  - @lens-protocol/react-web@2.0.0-alpha.17

## 3.0.0-alpha.13

### Patch Changes

- Updated dependencies [cf250df4]
- Updated dependencies [9490db8e]
- Updated dependencies [cf250df4]
  - @lens-protocol/react-web@2.0.0-alpha.16

## 3.0.0-alpha.12

### Patch Changes

- Updated dependencies [672c85e6]
- Updated dependencies [1bd69391]
- Updated dependencies [86fa12e0]
  - @lens-protocol/react-web@2.0.0-alpha.15

## 3.0.0-alpha.11

### Patch Changes

- Updated dependencies [8120f676]
- Updated dependencies [8120f676]
- Updated dependencies [061df834]
- Updated dependencies [8120f676]
  - @lens-protocol/react-web@2.0.0-alpha.14
  - @lens-protocol/shared-kernel@0.11.0-alpha.6

## 3.0.0-alpha.10

### Patch Changes

- 50b546c5: **fix:** wagmi peer dep
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
  - @lens-protocol/react-web@2.0.0-alpha.13

## 3.0.0-alpha.9

### Patch Changes

- Update dependencies
- Updated dependencies
  - @lens-protocol/react-web@2.0.0-alpha.12

## 3.0.0-alpha.8

### Patch Changes

- Updated dependencies
  - @lens-protocol/react-web@2.0.0-alpha.11

## 3.0.0-alpha.7

### Patch Changes

- Updated dependencies [fa49d587]
- Updated dependencies [c09c5fdc]
- Updated dependencies [0687207b]
  - @lens-protocol/react-web@2.0.0-alpha.10

## 3.0.0-alpha.6

### Minor Changes

- 9481f48b: **feat:** implements `useApproveModule` hook. It also upgrades viem and wagmi peer deps.

### Patch Changes

- Updated dependencies [cfc03dff]
- Updated dependencies [9481f48b]
- Updated dependencies [fca2473b]
- Updated dependencies [6ab0e99a]
- Updated dependencies [f997e3f0]
- Updated dependencies [cfc03dff]
- Updated dependencies [bdf81299]
  - @lens-protocol/react-web@2.0.0-alpha.9
  - @lens-protocol/shared-kernel@0.11.0-alpha.5

## 3.0.0-alpha.5

### Patch Changes

- Updated dependencies [30ccf19d]
- Updated dependencies [a42e90e7]
  - @lens-protocol/react-web@2.0.0-alpha.8

## 3.0.0-alpha.4

### Patch Changes

- Updated dependencies [a929c0f6]
- Updated dependencies [5bc7e430]
- Updated dependencies [8b86832f]
- Updated dependencies [d1414eda]
- Updated dependencies [2f618240]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4
  - @lens-protocol/react-web@2.0.0-alpha.7

## 3.0.0-alpha.3

### Patch Changes

- Updated dependencies [4630efb9]
- Updated dependencies [25b7ef51]
  - @lens-protocol/react-web@2.0.0-alpha.6

## 3.0.0-alpha.2

### Patch Changes

- Updated dependencies [734d6823]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3
  - @lens-protocol/react-web@2.0.0-alpha.5

## 3.0.0-alpha.1

### Patch Changes

- Updated dependencies
  - @lens-protocol/react-web@2.0.0-alpha.4

## 3.0.0-alpha.0

### Major Changes

- 9df5730b: **feat:** updateds peer dep on `@lens-protocol/react@2.x`

### Patch Changes

- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2
  - @lens-protocol/react-web@2.0.0-alpha.3

## 2.1.1

### Patch Changes

- Updated dependencies [ace02d32]
- Updated dependencies [5f251069]
- Updated dependencies [dfb15e1a]
- Updated dependencies [ebc2e7e5]
  - @lens-protocol/react-web@1.3.1

## 2.1.1-next.4

### Patch Changes

- @lens-protocol/react-web@1.3.1-next.4

## 2.1.1-next.3

### Patch Changes

- Updated dependencies [ace02d32]
  - @lens-protocol/react-web@1.3.1-next.3

## 2.1.1-next.2

### Patch Changes

- Updated dependencies [5f251069]
  - @lens-protocol/react-web@1.3.1-next.2

## 2.1.1-next.1

### Patch Changes

- Updated dependencies [dfb15e1a]
  - @lens-protocol/react-web@1.3.1-next.1

## 2.1.1-next.0

### Patch Changes

- Updated dependencies [ebc2e7e5]
  - @lens-protocol/react-web@1.3.1-next.0

## 2.1.0

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- Updated dependencies [09206763]
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [773c2ed8]
- Updated dependencies [c2a91ef4]
- Updated dependencies [b7609fcb]
- Updated dependencies [636ff014]
- Updated dependencies [773c2ed8]
- Updated dependencies [cfe0d51e]
- Updated dependencies [3ffab7b9]
- Updated dependencies [19ed489e]
- Updated dependencies [0f75f79d]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [125ec30c]
- Updated dependencies [28094a84]
- Updated dependencies [6eaaaf22]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [9428efeb]
- Updated dependencies [3b67207b]
- Updated dependencies [4c4505d2]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/react-web@1.3.0
  - @lens-protocol/shared-kernel@0.10.0

## 2.1.0-next.11

### Patch Changes

- Updated dependencies [09206763]
  - @lens-protocol/react-web@1.3.0-next.11

## 2.1.0-next.10

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/react-web@1.3.0-next.10
  - @lens-protocol/shared-kernel@0.10.0-next.2

## 2.1.0-next.9

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1
  - @lens-protocol/react-web@1.3.0-next.9

## 2.1.0-next.8

### Patch Changes

- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
  - @lens-protocol/react-web@1.3.0-next.8

## 2.1.0-next.7

### Patch Changes

- Updated dependencies [28094a84]
  - @lens-protocol/react-web@1.3.0-next.7

## 2.1.0-next.6

### Patch Changes

- Updated dependencies [3ffab7b9]
- Updated dependencies [19ed489e]
- Updated dependencies [6eaaaf22]
  - @lens-protocol/react-web@1.3.0-next.6

## 2.1.0-next.5

### Patch Changes

- Updated dependencies [b7609fcb]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
  - @lens-protocol/react-web@1.3.0-next.5
  - @lens-protocol/shared-kernel@0.10.0-next.0

## 2.1.0-next.4

### Patch Changes

- Updated dependencies [9428efeb]
  - @lens-protocol/react-web@1.3.0-next.4

## 2.1.0-next.3

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [636ff014]
- Updated dependencies [125ec30c]
- Updated dependencies [3b67207b]
  - @lens-protocol/react-web@1.3.0-next.3

## 2.1.0-next.2

### Patch Changes

- @lens-protocol/react-web@1.3.0-next.2

## 2.1.0-next.1

### Patch Changes

- @lens-protocol/react-web@1.3.0-next.1

## 2.0.2

### Patch Changes

- @lens-protocol/react-web@1.2.2

## 2.1.0-next.0

### Patch Changes

- Updated dependencies [c2a91ef4]
- Updated dependencies [cfe0d51e]
- Updated dependencies [0f75f79d]
- Updated dependencies [4c4505d2]
  - @lens-protocol/react-web@1.3.0-next.0

## 2.0.1

### Patch Changes

- @lens-protocol/react-web@1.2.1

## 2.0.0

### Major Changes

- 479333d3: **Upgraded** wagmi to v1

### Minor Changes

- cb5b900d: **Added** sandbox environment support

### Patch Changes

- Updated dependencies [cb5b900d]
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/react-web@1.2.0
  - @lens-protocol/shared-kernel@0.9.0

## 2.0.0-next.4

### Patch Changes

- @lens-protocol/react-web@1.2.0-next.4

## 1.1.1

### Patch Changes

- @lens-protocol/react-web@1.1.1

## 2.0.0-next.3

### Major Changes

- 479333d3: **Upgraded** wagmi to v1

### Patch Changes

- @lens-protocol/react-web@1.2.0-next.3

## 1.2.0-next.2

### Patch Changes

- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0-next.0
  - @lens-protocol/react-web@2.0.0-next.2

## 1.2.0-next.1

### Patch Changes

- @lens-protocol/react-web@1.2.0-next.1

## 1.2.0-next.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support

### Patch Changes

- Updated dependencies [cb5b900d]
  - @lens-protocol/react-web@1.2.0-next.0

## 1.1.0

### Minor Changes

- c416a2e: **Added:** self-fund protocol calls when subsidized approach fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings

### Patch Changes

- ef1d7e2: Added Momoka support to React hooks
- Updated dependencies [72becec]
- Updated dependencies [c416a2e]
- Updated dependencies [cf4a420]
- Updated dependencies [b738abb]
  - @lens-protocol/react-web@1.1.0
  - @lens-protocol/shared-kernel@0.8.0

## 1.1.0-next.5

### Patch Changes

- @lens-protocol/react-web@1.1.0-next.5

## 1.1.0-next.4

### Patch Changes

- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/react-web@1.1.0-next.4

## 1.1.0-next.3

### Patch Changes

- @lens-protocol/react-web@1.1.0-next.3

## 1.1.0-next.2

### Patch Changes

- ef1d7e2: Added Momoka support to React hooks
  - @lens-protocol/react-web@1.1.0-next.2

## 1.1.0-next.1

### Patch Changes

- @lens-protocol/react-web@1.1.0-next.1

## 1.1.0-next.0

### Minor Changes

- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings

### Patch Changes

- Updated dependencies [72becec0]
- Updated dependencies [c416a2ea]
- Updated dependencies [cf4a4201]
  - @lens-protocol/react-web@1.1.0-next.0
  - @lens-protocol/shared-kernel@0.8.0-next.0

## 1.0.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/react-web@1.0.1
  - @lens-protocol/shared-kernel@0.7.1

## 1.0.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [520a7c1]
- Updated dependencies [0f20b5a]
- Updated dependencies [37eaf8a]
- Updated dependencies [0f20b5a]
  - @lens-protocol/react-web@1.0.0
  - @lens-protocol/shared-kernel@0.7.0

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [0f20b5a]
- Updated dependencies [0f20b5a]
  - @lens-protocol/react-web@1.0.0-beta.1

## 1.0.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [520a7c1]
- Updated dependencies [dc1350d]
  - @lens-protocol/react-web@1.0.0-beta.0
  - @lens-protocol/shared-kernel@0.7.0-beta.0

## 0.6.0

### Patch Changes

- @lens-protocol/react-web@0.4.2
- @lens-protocol/shared-kernel@0.6.0

## 0.5.1

### Patch Changes

- Updated dependencies [44596707]
- Updated dependencies [ed973b51]
  - @lens-protocol/react@0.5.1
  - @lens-protocol/shared-kernel@0.5.1

## 0.5.0

### Minor Changes

- 30abfeec: Updated peer dependency of "wagmi" to ">=0.9.2 <=0.11.7"
- Updated dependencies [99eb422e]
  - @lens-protocol/react@0.5.0
  - @lens-protocol/shared-kernel@0.5.0

## 0.4.1

### Patch Changes

- Updated dependencies [58c9d8e]
  - @lens-protocol/react@0.4.1
  - @lens-protocol/shared-kernel@0.4.1

## 0.4.0

### Patch Changes

- Updated dependencies [b5350d9]
- Updated dependencies [de56baf]
- Updated dependencies [f0897b1]
- Updated dependencies [169352f]
- Updated dependencies [fa654d3]
- Updated dependencies [daad9ed]
  - @lens-protocol/react@0.4.0
  - @lens-protocol/shared-kernel@0.4.0

## 0.3.0

### Patch Changes

- @lens-protocol/react@0.3.0
- @lens-protocol/shared-kernel@0.3.0

## 0.2.0

### Patch Changes

- Updated dependencies [930d252]
- Updated dependencies [7b8e3f8]
- Updated dependencies [c6a168e]
- Updated dependencies [4e2b448]
- Updated dependencies [5f46cde]
- Updated dependencies [c89aed9]
- Updated dependencies [1c607e2]
- Updated dependencies [a921c32]
  - @lens-protocol/react@1.0.0
  - @lens-protocol/shared-kernel@1.0.0

## 0.1.1

### Patch Changes

- Updated dependencies [e8c5846]
  - @lens-protocol/react@0.1.1
  - @lens-protocol/shared-kernel@0.1.1

## 0.1.0

First developer preview release

feat: wagmi bindings
