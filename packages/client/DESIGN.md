## Modules

they're all chained under LensClient instance, like so:

```ts
client.[moduleName].[moduleMethod](args)
```

- authentication

  - [x] challenge
  - [x] verify
  - [x] authenticate
  - [x] refresh
  - [x] isAuthenticated
  - [x] getAccessToken

- wallet

  - [x] ownedHandles
  - [x] profilesManaged
  - [x] sigNonces

- profile

  - [x] fetch
  - [x] fetchAll
  - [x] managers
  - [ ] followers ??
  - [x] following
  - [x] recommendations
  - [ ] doesFollow ??
  - [x] mutualFollowers
  - stats

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

  - [x] fetch
  - [x] fetchAll
  - [x] tags
  - [x] validateMetadata
  - stats ??

  - [x] hide
  - [x] report

  - [x] postOnChain
  - [x] commentOnChain
  - [x] mirrorOnChain
  - [x] quoteOnChain

  - [ ] postOnMomoka
  - [ ] commentOnMomoka
  - [ ] mirrorOnMomoka
  - [ ] quoteOnMomoka

  - [ ] createOnChainPostTypedData
  - [ ] createOnChainCommentTypedData
  - [ ] createOnChainMirrorTypedData
  - [ ] createOnChainQuoteTypedData
  - [ ] createMomokaPostTypedData
  - [ ] createMomokaCommentTypedData
  - [ ] createMomokaMirrorTypedData
  - [ ] createMomokaQuoteTypedData

  - [x] bookmarks

    - [x] fetch
    - [x] add
    - [x] remove

  - [ ] notInterested

    - add
    - undo

  - [x] reactions

    - [x] fetch
    - [x] add
    - [x] remove

  - [ ] actions

    - actOn
    - createActOnOpenActionTypedData

- feed

  - [x] fetch
  - [x] highlights
  - [x] forYou

- explore

  - [x] profiles
  - [x] publications

- search

  - [x] profiles
  - [x] publications
  - nfts ??

- notifications

  - [x] fetch

- momoka

  - [x] submitters
  - [x] summary
  - [x] transactions
  - [x] transaction

- nfts

  - [x] fetch
  - [x] fetchGalleries

  - [x] ownershipChallenge
  - [x] createGallery
  - [x] deleteGallery
  - [x] updateGalleryInfo
  - [x] updateGalleryItems
  - [x] updateGalleryOrder

- revenue

  - [x] fromFollow
  - [x] fromPublications
  - [x] forPublication

- transaction

  - [x] txIdToTxHash
  - [x] status

  - [x] broadcastOnChain
  - [x] broadcastOnMomoka

- stats (global)

  - fetch

- invites

  - amountLeft
  - alreadyInvited
  - inviteStatus
  - invite(address)

- modules
  - currencies
  - enabled
  - ??
