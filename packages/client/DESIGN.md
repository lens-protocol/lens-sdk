## Modules

they're all chained under LensClient instance, like so:

```ts
client.[moduleName].[moduleMethod](args)
```

- [x] authentication
  <!-- queries -->

  - challenge(profileId)
  - verify

  <!-- mutations -->

  - authenticate
  - refresh

  <!-- helpers -->

  - isAuthenticated
  - getAccessToken

- [x] bookmarks

  <!-- queries -->

  - fetch

  <!-- mutations -->

  - add
  - remove

- notInterested

  <!-- queries -->

  - fetch

  <!-- mutations -->

  - add
  - undo

- [x] interests

  <!-- mutations -->

  - add
  - remove

- [x] explore

  <!-- queries -->

  - profiles
  - publications

- [x] feed

  <!-- queries -->

  - fetch
  - highlights
  - forYou

- invites

  <!-- queries -->

  - amountLeft
  - alreadyInvited
  - invited

  <!-- mutations -->

  - invite

- [x] momoka

  <!-- queries -->

  - submitters
  - summary
  - transactions
  - transaction

  <!-- mutations -->

  - broadcast

- [x] nfts
  <!-- queries -->

  - fetch
  - fetchGalleries

  <!-- mutations -->

  - ownershipChallenge
  - createGallery
  - deleteGallery
  - updateGalleryInfo
  - updateGalleryItems
  - updateGalleryOrder

- [x] nonces
  <!-- queries -->

  - fetch

- [x] notifications
  <!-- queries -->

  - fetch

- openAction(s)

  - createOpenActionActTypedData
  - ??

- modules
  <!-- queries -->

  - currencies
  - enabled
  - ??

- wallet

  <!-- queries -->

  - handles
  - profiles

- profile

    <!-- queries -->

  - fetch
  - fetchAll
  - managers
  - followers
  - following
  - allRecommended
  - doesFollow
  - mutualFollowers
  - stats

    <!-- mutations -->

  - claimHandle
  - block
  - unblock
  - dismissRecommended
  - create

  - createSetProfileManagerTypedData
  - createFollowTypedData
  - createUnfollowTypedData
  - createSetFollowModuleTypedData
  - createOpenActionActTypedData ??
  - createSetProfileMetadataTypedData
  - createSetProfileImageURITypedData
  - createSetProfileImageURI
  - createDeleteProfileTypedData

- publication

  <!-- queries -->

  - fetch
  - fetchAll
  - allForSale
  - allWhoCollected
  - metadataStatus
  - validateMetadata
  - stats

  <!-- mutations -->

  - quote
  - hide
  - report

  - postOnChain
  - postOnMomoka
  - commentOnChain
  - commentOnMomoka
  - mirrorOnChain
  - mirrorOnMomoka

  - createOnChainPostTypedData
  - createMomokaPostTypedData
  - createOnChainCommentTypedData
  - createMomokaCommentTypedData
  - createOnChainMirrorTypedData
  - createMomokaMirrorTypedData

  - createOpenActionActTypedData ??

- [x] reactions

  <!-- queries -->

  - fetch

  <!-- mutations -->

  - add
  - remove

- [x] revenue

  <!-- queries -->

  - fromFollow
  - fromPublications
  - forPublication

- search

  <!-- queries -->

  - [x] profiles
  - [x] publications
  - nfts ??

- stats (global)

  <!-- queries -->

  - fetch

- [x] transaction

  <!-- queries -->

  - txIdToTxHash
  - status

  <!-- mutations -->

  - broadcast
