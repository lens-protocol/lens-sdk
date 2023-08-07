## Modules

they're all chained under LensClient instance, like so:

```ts
client.[moduleName].[moduleMethod](args)
```

- authentication
  <!-- queries -->

  - challenge(profileId)
  - verify

  <!-- mutations -->

  - authenticate
  - refresh

  <!-- helpers -->

  - isAuthenticated
  - getAccessToken

- bookmarks

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

- interests

    <!-- queries -->

  - fetch

  <!-- mutations -->

  - add
  - remove

- explore

  <!-- queries -->

  - profiles
  - publications

- feed

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

- momoka

  <!-- queries -->

  - submitters
  - summary
  - transactions
  - transaction

  <!-- mutations -->

  - broadcast

- nfts
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

- nonces
  <!-- queries -->

  - fetch

- notifications
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

- reactions

  <!-- queries -->

  - fetch

  <!-- mutations -->

  - add
  - remove

- revenue

  <!-- queries -->

  - fromFollow
  - fromPublications
  - forPublication

- search

  <!-- queries -->

  - profiles
  - publications
  - nfts

- stats (global)

  <!-- queries -->

  - fetch

- transaction

  <!-- queries -->

  - txIdToTxHash
  - status

  <!-- mutations -->

  - broadcast
