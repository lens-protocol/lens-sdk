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
  - [x] setFollowModule
  - [x] dismissRecommended

  - [x] linkHandle - Query.linkHandleToProfile (should be mutation?)
  - [x] unlinkHandle - Query.unlinkHandleToProfile

  - [x] createSetProfileMetadataTypedData
  - [x] createSetProfileImageTypedData
  - [x] createChangeProfileManagersTypedData
  - [x] createBlockProfileTypedData
  - [x] createUnblockProfileTypedData
  - [x] createFollowTypedData
  - [x] createUnfollowTypedData
  - [x] createSetFollowModuleTypedData
  - [ ] createDeleteProfileTypedData ?? - was it removed?

- [x] publication

  - [x] fetch
  - [x] fetchAll
  - [x] tags
  - [x] validateMetadata
  - [x] stats

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

  - [x] legacyCollect
  - [x] createLegacyCollectPublicationTypedData

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

  - [x] actions

    - [x] actOn
    - [x] createActOnOpenActionTypedData

- [x] feed

  - [x] fetch
  - [x] highlights
  - [x] forYou

- [x] explore

  - [x] profiles
  - [x] publications

- [x] search

  - [x] profiles
  - [x] publications

- [x] notifications

  - [x] fetch

- [x] momoka

  - [x] submitters
  - [x] summary
  - [x] transactions
  - [x] transaction

- [x] nfts

  - [x] fetch
  - [x] fetchGalleries

  - [x] ownershipChallenge
  - [x] createGallery
  - [x] deleteGallery
  - [x] updateGalleryInfo
  - [x] updateGalleryItems
  - [x] updateGalleryOrder

- [x] revenue

  - [x] fromFollow
  - [x] fromPublications
  - [x] forPublication

- transaction

  - [x] txIdToTxHash
  - [x] status

  - [x] broadcastOnChain
  - [x] broadcastOnMomoka

- [x] invites

  - [x] invitedProfiles
  - [x] profileAlreadyInvited
  - [x] inviteProfile

- [x] modules
  - [x] currencies
  - [x] supportedModules
  - [x] approvedModuleAllowanceAmount
  - [x] generateModuleCurrencyApprovalData
