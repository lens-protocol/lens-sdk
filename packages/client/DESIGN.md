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
  - [x] following
  - [x] recommendations
  - [x] mutualFollowers
  - [ ] followers ?? - was it removed?
  - [ ] stats - as a separate method using ProfileStatsArgs

  - [x] claim
  - [x] create
  - [x] addInterests - client.profile.interests.add() ?
  - [x] removeInterests - client.profile.interests.remove() ?
  - [ ] interests.fetch - there was a method to fetch all available interests - was it removed ?
  - [x] setMetadata
  - [x] setImage
  - [x] setManager
  - [x] block
  - [x] unblock
  - [x] follow
  - [x] unfollow
  - [ ] setFollowModule
  - [x] dismissRecommended

  - [ ] linkHandle - Query.linkHandleToProfile (should be mutation?)
  - [ ] unlinkHandle - Query.unlinkHandleToProfile

  - [x] createSetProfileMetadataTypedData
  - [x] createSetProfileImageTypedData
  - [x] createChangeProfileManagersTypedData
  - [x] createBlockProfileTypedData
  - [x] createUnblockProfileTypedData
  - [x] createFollowTypedData
  - [x] createUnfollowTypedData
  - [x] createSetFollowModuleTypedData
  - [ ] createDeleteProfileTypedData ?? - was it removed?

- publication

  - [x] fetch
  - [x] fetchAll
  - [x] tags
  - [x] validateMetadata
  - [ ] stats - as a separate method using PublicationStatsInput

  - [x] hide
  - [x] report

  - [x] postOnChain
  - [x] commentOnChain
  - [x] mirrorOnChain
  - [x] quoteOnChain
  - [x] postOnMomoka
  - [x] commentOnMomoka
  - [x] mirrorOnMomoka
  - [x] quoteOnMomoka

  - [x] createOnChainPostTypedData
  - [x] createOnChainCommentTypedData
  - [x] createOnChainMirrorTypedData
  - [x] createOnChainQuoteTypedData
  - [x] createMomokaPostTypedData
  - [x] createMomokaCommentTypedData
  - [x] createMomokaMirrorTypedData
  - [x] createMomokaQuoteTypedData

  - [ ] legacyCollect
  - [ ] createLegacyCollectPublicationTypedData

  - [x] bookmarks

    - [x] fetch
    - [x] add
    - [x] remove

  - [x] notInterested

    - [x] add
    - [x] undo

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

- invites ??

  - amountLeft
  - inTotal
  - alreadyInvited
  - inviteStatus
  - invite(address)

- modules
  - currencies
  - supportedModules
  - approvedModuleAllowanceAmount
  - generateModuleCurrencyApprovalData
