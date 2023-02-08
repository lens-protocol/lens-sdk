# Planned React hooks

## Authentication

- [x] `useWalletLogin`
- [x] `useWalletLogout`

## Collect/follow modules support

- [x] `useApproveModule` - signed, paid gas
- [x] `useCurrencies`
- [x] `useEnabledModules`

## Profile

- [x] `useActiveProfile`
- [x] `useProfile`
- [x] `useProfilesToFollow`
- [x] `useProfileFollowers`
- [x] `useProfileFollowing`
- [x] `useFollow`
  - [x] sign-less, gas-less (via proxy action)
  - [x] signed, gas-less
  - [x] signed, paid gas (fallback)
- [ ] `useUnfollow`
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useUpdateProfileImage` - upload
  - [ ] sign-less, gas-less (via dispatcher)
  - [x] signed, gas-less
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
- [x] `useCollectedPublications`
- [x] `useMutualFollowers`

## Explore

- [x] `useExploreProfiles`
- [x] `useExplorePublications`

## Feed

- [x] `useFeed`

## Publication

- [x] `usePublication`
- [x] `useComments`
- [x] `usePublications`
- [ ] `useCreatePost`
  - [ ] sign-less, gas-less, instant (via Data Availability)
  - [x] sign-less, gas-less
  - [x] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useCreateComment`
  - [ ] sign-less, gas-less, instant (via Data Availability)
  - [x] sign-less, gas-less
  - [x] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useCreateMirror`
  - [x] sign-less, gas-less
  - [x] signed, gas-less
  - [ ] signed, paid (fallback)
- [ ] `useCollect`
  - [ ] sign-less, gas-less (via proxy action)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [x] `useReaction`
- [x] `useWhoReacted`

## Revenue

- [x] `usePublicationRevenue`
- [ ] `useProfilePublicationsRevenue`
- [ ] `useProfileFollowsRevenue`

## Search

- [x] `useSearchPublications`
- [x] `useSearchProfiles`

## Notifications

- [x] `useNotifications`
- [x] `useUnreadNotificationCount`

## NFTs

- [ ] `useNfts` - TBD
