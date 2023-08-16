## Modules

they're all chained under LensClient instance, like so:

```ts
client.[moduleName].[moduleMethod](args)
```

- [x] authentication
  <!-- queries -->

  - [x] challenge(profileId)
  - [x] verify

  <!-- mutations -->

  - [x] authenticate
  - [x] refresh

  <!-- helpers -->

  - [x] isAuthenticated
  - [x] getAccessToken

- [x] bookmarks

  <!-- queries -->

  - [x] fetch

  <!-- mutations -->

  - [x] add
  - [x] remove

- notInterested

  <!-- queries -->

  - fetch

  <!-- mutations -->

  - add
  - undo

- [x] explore

  <!-- queries -->

  - [x] profiles
  - [x] publications

- [x] feed

  <!-- queries -->

  - [x] fetch
  - [x] highlights
  - [x] forYou

- invites

  <!-- queries -->

  - amountLeft
  - alreadyInvited
  - invited

  <!-- mutations -->

  - invite ?? - or profile.invite()

- [x] momoka

  <!-- queries -->

  - [x] submitters
  - [x] summary
  - [x] transactions
  - [x] transaction

- [x] nfts
  <!-- queries -->

  - [x] fetch
  - [x] fetchGalleries

  <!-- mutations -->

  - [x] ownershipChallenge
  - [x] createGallery
  - [x] deleteGallery
  - [x] updateGalleryInfo
  - [x] updateGalleryItems
  - [x] updateGalleryOrder

- [x] notifications
  <!-- queries -->

  - [x] fetch

- modules
  <!-- queries -->

  - currencies
  - enabled
  - ??

- [x] wallet

  <!-- queries -->

  - [x] ownedHandles
  - [x] profilesManaged
  - [x] sigNonces

- profile

    <!-- queries -->

  - [x] fetch
  - [x] fetchAll
  - [x] managers
  - [ ] followers ??
  - [x] following
  - [x] recommendations
  - [ ] doesFollow ??
  - [x] mutualFollowers
  - stats

    <!-- mutations -->

  - [x] claim
  - [x] create
  - [x] addInterests
  - [x] removeInterests
  - [x] setMetadata
  - [x] setImage
  - [x] setManager
  - [x] block
  - [x] unblock
  - [x] follow
  - [x] unfollow
  - [x] dismissRecommended

  - [x] createSetProfileMetadataTypedData
  - [x] createSetProfileImageTypedData
  - [x] createChangeProfileManagersTypedData
  - [x] createBlockProfileTypedData
  - [x] createUnblockProfileTypedData
  - [x] createFollowTypedData
  - [x] createUnfollowTypedData
  - [x] createSetFollowModuleTypedData
  - createDeleteProfileTypedData ??

- publication

  <!-- queries -->

  - [x] fetch
  - [x] fetchAll
  - allForSale
  - allWhoCollected
  - metadataStatus
  - validateMetadata
  - stats

  <!-- mutations -->

  - quote
  - hide
  - report

  - [ ] postOnChain
  - [ ] postOnMomoka
  - [ ] commentOnChain
  - [ ] commentOnMomoka
  - [ ] mirrorOnChain
  - [ ] mirrorOnMomoka

  - [ ] createOnChainPostTypedData
  - [ ] createMomokaPostTypedData
  - [ ] createOnChainCommentTypedData
  - [ ] createMomokaCommentTypedData
  - [ ] createOnChainMirrorTypedData
  - [ ] createMomokaMirrorTypedData

  - actOnOpenAction ??
  - createActOnOpenActionTypedData ??

- [x] reactions

  <!-- queries -->

  - [x] fetch

  <!-- mutations -->

  - [x] add
  - [x] remove

- [x] revenue

  <!-- queries -->

  - [x] fromFollow
  - [x] fromPublications
  - [x] forPublication

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

  - [x] txIdToTxHash
  - [x] status

  <!-- mutations -->

  - [x] broadcastOnChain
  - [x] broadcastOnMomoka

## To consider

- separate module `manager` to trigger all managed actions (that return LensProfileManagerRelayResult)
