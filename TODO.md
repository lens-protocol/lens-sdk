# Planned React hooks

## Authentication

- [x] `useWalletLogin`
- [x] `useWalletLogout`

## Collect/follow modules support

- [ ] `useApproveModule` - signed, paid gas
- [x] `useCurrencies`

## Profile

- [x] `useActiveProfile`
- [x] `useProfile`
- [x] `useProfilesToFollow`
- [ ] `useProfileFollowers`
- [ ] `useProfileFollowing`
- [ ] `useFollow`
  - [ ] sign-less, gas-less (via proxy action)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUnfollow`
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateProfileImage` - upload
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateProfileImage` - NFT
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateCoverImage`
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateProfileDetails`
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateFollowPolicy`
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateDispatcherConfig`
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useCollectables` - to be renamed
- [ ] `useMutualFollowers`

## Explore

- [x] `useExploreProfiles`
- [ ] `useExplorePublications`

## Feed

- [x] `useFeed`

## Publication

- [x] `usePublication`
- [x] `usePublicationComments`
- [x] `usePublications`
- [ ] `useCreatePost`
  - [ ] sign-less, gas-less, instant (via Data Availability)
  - [x] sign-less, gas-less
  - [x] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useCreateComment`
  - [ ] sign-less, gas-less, instant (via Data Availability)
  - [ ] sign-less, gas-less
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useMirror`
  - [ ] sign-less, gas-less
  - [ ] signed, gas-less
  - [ ] signed, paid (fallback)
- [ ] `useCollect`
  - [ ] sign-less, gas-less (via proxy action)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useReaction`
- [ ] `useWhoReacted`

## Revenue

- [ ] `usePublicationRevenue`
- [ ] `useProfilePublicationsRevenue`
- [ ] `useProfileFollowsRevenue`

## Search

- [x] `useSearchPublications`
- [x] `useSearchProfiles`

## Notifications

- [ ] `useNotifications`
- [ ] `useUnreadNotifications`

## NFTs

- [ ] `useNfts` - TBD
