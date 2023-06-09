# @lens-protocol/client

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
