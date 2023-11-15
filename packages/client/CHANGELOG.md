# @lens-protocol/client

## 2.0.0-alpha.21

### Patch Changes

- 9a9f3130d: **fix** robust handling of legacy token-gated publication with empty `tokenIds` as ERC-721 NFT Ownership condition
- Updated dependencies [9a9f3130d]
- Updated dependencies [d71f981cc]
  - @lens-protocol/gated-content@0.3.3-alpha.15
  - @lens-protocol/shared-kernel@0.11.0-alpha.8
  - @lens-protocol/storage@0.7.5-alpha.6

## 2.0.0-alpha.20

### Patch Changes

- 297e814dc: **feat:** Added `wallet.claimableProfiles` and `wallet.claimProfile`.
  **chore:** Moved `profile.create` to `wallet.createProfile`.
  **chore:** Deprecated `profile.create`.
- 7ae662389: **feat:** Added `profile.whoHaveBeenBlocked`
- 4b10c58f8: **feat:** Added custom headers option to LensClientConfig
- 3a9720968: **feat:** Added `isLensManager` to `ProfileManager` fragment
- Updated dependencies [2f5360796]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7
  - @lens-protocol/gated-content@0.3.3-alpha.14
  - @lens-protocol/storage@0.7.5-alpha.5

## 2.0.0-alpha.19

### Patch Changes

- c1e6ada2: Allowed to overwrite accessToken for publication.postOnchain
- b014f5ce: Disabled clock check
- 91bd7229: Renamed `AnyPublicationMetadataFragment` to `PublicationMetadataFragment`

## 2.0.0-alpha.18

### Patch Changes

- 7ed02dd93: **fix:** decryption of undefined metadata fields that are exposed as empty strings in GQL schemas
- Updated dependencies [7ed02dd93]
  - @lens-protocol/gated-content@0.3.3-alpha.13

## 2.0.0-alpha.17

### Patch Changes

- 1bd69391: **chore:** updates `@lens-protocol/metadata` package to 1.0.0
- becb6338: Updated to latest API schema to use correct legacy collect typed data
- Updated dependencies [1bd69391]
  - @lens-protocol/gated-content@0.3.3-alpha.12

## 2.0.0-alpha.16

### Patch Changes

- bef43b12: Added option to configure the `Origin` header when making requests to the Lens API.
- 55a07ad4: Added `authentication.fetch` to get current session details
- 061df834: **chore:** configure Lens API v2 production URL
- 75f25d39: Added `authentication.fetchAll`, `authentication.revoke` and `authentication.logout` methods to manage active sessions.
- Updated dependencies [061df834]
  - @lens-protocol/shared-kernel@0.11.0-alpha.6
  - @lens-protocol/gated-content@0.3.3-alpha.11
  - @lens-protocol/storage@0.7.5-alpha.4

## 2.0.0-alpha.15

### Patch Changes

- 5f93ea77: **fix:** support `Profile.lensManager` into `Profile.signless` renaming
- 5f93ea77: **fix:** support new `HandleInfo`
- 5f93ea77: **fix:** supports `MetadataAttribute.type`
- 5f93ea77: **fix:** renames of `handleLinkToProfile`, `handleUnlinkToProfile` and correlated mutations, types
- 5f93ea77: **fix:** uses `invite` mutation rather than `inviteProfile`
- 5f93ea77: **fix:** adds `type` to Open Action module settings types
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
  - @lens-protocol/gated-content@0.3.3-alpha.10

## 2.0.0-alpha.14

### Patch Changes

- c46f6b34: Added profile.fetchDefault and profile.setDefault methods

## 2.0.0-alpha.13

### Patch Changes

- 9481f48b: **feat:** upgrades viem and wagmi peer deps.
- Updated dependencies [9481f48b]
  - @lens-protocol/shared-kernel@0.11.0-alpha.5
  - @lens-protocol/gated-content@0.3.3-alpha.9
  - @lens-protocol/storage@0.7.5-alpha.3

## 2.0.0-alpha.12

### Patch Changes

- 01b2c2cb: Updated to support the latest API schema
- Updated dependencies [01b2c2cb]
  - @lens-protocol/gated-content@0.3.3-alpha.8

## 2.0.0-alpha.11

### Patch Changes

- 8c4da31a: Updated to latest api schema, used TypedDocumentNode to improve startup time
- Updated dependencies [a929c0f6]
- Updated dependencies [8c4da31a]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4
  - @lens-protocol/gated-content@0.3.3-alpha.7
  - @lens-protocol/storage@0.7.5-alpha.2

## 2.0.0-alpha.10

### Patch Changes

- Updated dependencies [734d6823]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3
  - @lens-protocol/gated-content@0.3.3-alpha.6
  - @lens-protocol/storage@0.7.5-alpha.1

## 2.0.0-alpha.9

### Patch Changes

- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2
  - @lens-protocol/gated-content@0.3.3-alpha.5
  - @lens-protocol/storage@0.7.5-alpha.0

## 2.0.0-alpha.8

### Patch Changes

- f31c4e89: Removed `forApps` from config as it was used only when quering for profile stats
- Updated dependencies [25fe9a46]
  - @lens-protocol/shared-kernel@0.11.0-alpha.1

## 2.0.0-alpha.7

### Minor Changes

- c043b1d2: **feat:** token-gated support for LIP-2 metadata spec

### Patch Changes

- 62a382db: **Added** profile action history as `profile.actionHistory()`
- Updated dependencies [c043b1d2]
  - @lens-protocol/gated-content@0.3.3-alpha.4

## 2.0.0-alpha.6

### Patch Changes

- 3a894449: Changed waitUntilComplete to timeout after 60s
- Updated dependencies [731ff1d0]
  - @lens-protocol/shared-kernel@0.11.0-alpha.0

## 2.0.0-alpha.5

### Patch Changes

- 64f5625f: **feat:** support simplified AccessCondition schema
- 2c2b8fa0:
  **Removed** separate methods to query profile and publication stats.
  **Added** stats field to all profile and publication query responses.

## 2.0.0-alpha.4

### Patch Changes

- 43bb1af0: - renamed `profile.createOnchainSetProfileMetadataTypedData` to `profile.createSetProfileMetadataTypedData`
  - removed duplicated method `profile.changeProfileManagers`, use `profile.createChangeProfileManagersTypedData` instead
  - renamed `profile.createUnblockProfileTypedData` to `profile.createUnblockProfilesTypedData`
- b49df26f: Added `client.modules` and required node version

## 2.0.0-alpha.3

### Patch Changes

- 414c4d81: **Added** poaps module, added whoActedOnPublication, more examples

## 2.0.0-alpha.2

### Patch Changes

- 35d787fe: **Updated** schema to the latest version of the API

## 2.0.0-alpha.1

### Patch Changes

- **Updated** schema to the latest version of the API

## 2.0.0-alpha.0

### Major Changes

- **Added** support for Lens API v2

## 1.3.1

### Patch Changes

- 48dd0860: **Fixed** internal imports

## 1.3.1-next.0

### Patch Changes

- 48dd0860: **Fixed** internal imports

## 1.3.0

### Minor Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- c2a91ef4: **Added** `Profile.invitedBy` field
- ea1fcc30: **Added** support for new MediaSet fields: onChain, optimized, transformed
- 4c4505d2: **Added** support for Profile Guardian

### Patch Changes

- Updated dependencies [fc31f146]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/shared-kernel@0.10.0
  - @lens-protocol/storage@0.7.4

## 1.3.0-next.5

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2
  - @lens-protocol/storage@0.7.4-next.2

## 1.3.0-next.4

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1
  - @lens-protocol/storage@0.7.4-next.1

## 1.3.0-next.3

### Patch Changes

- Updated dependencies [fc31f146]
  - @lens-protocol/shared-kernel@0.10.0-next.0
  - @lens-protocol/storage@0.7.4-next.0

## 1.3.0-next.2

### Minor Changes

- ea1fcc30: **Added** support for new MediaSet fields: onChain, optimized, transformed

## 1.3.0-next.1

### Minor Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications

## 1.3.0-next.0

### Minor Changes

- c2a91ef4: **Added** `Profile.invitedBy` field
- 4c4505d2: **Added** support for Profile Guardian

## 1.2.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support

### Patch Changes

- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0
  - @lens-protocol/storage@0.7.3

## 1.2.0-next.1

### Patch Changes

- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0-next.0
  - @lens-protocol/storage@0.7.3-next.0

## 1.2.0-next.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support

## 1.1.0

### Minor Changes

- 1e34bc6: **Added** `verify` and `getAccessToken` methods to the authentication module
- 5c5bfb2: **Added** support for `SimpleCollectModule`
- 86fc3de: **Added** support for data availability publications
- a85e9a7: Use `fetch` instead of `XMLHttpRequest` to fix edge functions use cases

### Patch Changes

- ef96756: Fixed enum exports for:

  - `CommentOrderingTypes`
  - `CommentRankingFilter`
  - `ContractType`
  - `ProxyActionStatusTypes`
  - `PublicationMetadataStatusType`
  - `PublicationReportingFraudSubreason`
  - `PublicationReportingIllegalSubreason`
  - `PublicationReportingReason`
  - `PublicationReportingSensitiveSubreason`
  - `PublicationReportingSpamSubreason`
  - `RelayErrorReasons`
  - `ScalarOperator`
  - `TransactionErrorReasons`

- 7218910: Added support for more metadata fields in create publication methods
- 59c7a20: Added `isPostPublication`, `isCommentPublication` and `isMirrorPublication` helpers
- Updated dependencies [c416a2e]
- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/storage@0.7.2

## 1.1.0-next.2

### Patch Changes

- 59c7a20: Added `isPostPublication`, `isCommentPublication` and `isMirrorPublication` helpers

## 1.1.0-next.1

### Minor Changes

- 5c5bfb2: Added support for SimpleCollectModule

### Patch Changes

- 7218910: Added support for more metadata fields in create publication methods
- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/storage@0.7.2-next.1

## 1.1.0-next.0

### Minor Changes

- 86fc3de3: Added support for data availability publications
- a85e9a7b: Use fetch instead of XMLHttpRequest to fix edge functions use cases

### Patch Changes

- ef96756f: Fixed enum exports for:

  - CommentOrderingTypes
  - CommentRankingFilter
  - ContractType
  - ProxyActionStatusTypes
  - PublicationMetadataStatusType
  - PublicationReportingFraudSubreason
  - PublicationReportingIllegalSubreason
  - PublicationReportingReason
  - PublicationReportingSensitiveSubreason
  - PublicationReportingSpamSubreason
  - RelayErrorReasons
  - ScalarOperator
  - TransactionErrorReasons

- Updated dependencies [c416a2ea]
  - @lens-protocol/shared-kernel@0.8.0-next.0
  - @lens-protocol/storage@0.7.2-next.0

## 1.0.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/shared-kernel@0.7.1
  - @lens-protocol/storage@0.7.1

## 1.0.0

### Minor Changes

- 7af4585: **Breaking:** removed default export of main client class, added LensClient as named export
- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- fce5b18: Added support for new collect modules: multirecipientFeeCollectModule, erc4626FeeCollectModule, aaveFeeCollectModule
- 6ae90ef: Exposed collectNftAddress from publication fragments
- d865959: Changed PublicationRevenue query to return PublicationRevenue fragment
- 0f20b5a: Changed storage keys so use environment name as namespace
- c8c069c: Reduced exposed fields on MirrorFragment to guide correct usage of Mirrors
- 0f20b5a: Changed env config variables to be `development` and `production`
- d1499aa: Added refresh access token on `isAuthenticated` call
- Updated dependencies [37eaf8a]
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/storage@0.7.0

## 1.0.0-beta.1

### Minor Changes

- 7af4585: Removed default export of main client class, added LensClient as named export

### Patch Changes

- 0f20b5a: Changed storage keys so use environment name as namespace
- 0f20b5a: Changed env config variables to be `development` and `production`

## 1.0.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- fce5b18: Added support for new collect modules: `multirecipientFeeCollectModule`, `erc4626FeeCollectModule`, `aaveFeeCollectModule`
- 6ae90ef: Exposed `collectNftAddress` from publication fragments
- d865959: Changed `PublicationRevenue` query to return `PublicationRevenue` fragment
- c8c069c: Reduced exposed fields on MirrorFragment to guide correct usage of Mirrors
- d1499aa: Added refresh access token on `isAuthenticated` call
- Updated dependencies [dc1350d]
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/storage@0.7.0-beta.0

## 0.3.0

- Fixed `profile.createSetProfileImageURIViaDispatcher()`
- Added authentication header to all API requests if client is authenticated

### Patch Changes

- @lens-protocol/storage@0.6.0
- @lens-protocol/shared-kernel@0.6.0

## 0.2.0

### Minor Changes

- Fixed authentication in `Feed` module
- Added a few transaction helpers
- Exported multiple codegen generated types
- Added `options` argument to `profile.allRecommended`

## 0.1.1

### Patch Changes

- ed973b51: Added `electedMirror`, `mirrors`, `collects` and `reactions` to feed query
  - @lens-protocol/storage@0.5.1
  - @lens-protocol/shared-kernel@0.5.1

## 0.1.0

- Developer preview release
