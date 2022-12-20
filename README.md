# Lens SDK 🌿 (alpha)

The official SDK for the Lens Protocol.

## Documentation

All Lens Protocol documentation, including this SDK documentation can be found at: https://docs.lens.xyz/docs

## Planned React hooks

### Authentication

- [x] `useWalletLogin`
- [x] `useWalletLogout`

### Collect/follow modules support

- [ ] `useApproveModule` - signed, paid gas
- [x] `useCurrencies`

### Profile

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
- `useUpdateProfileImage` - upload
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- `useUpdateProfileImage` - NFT
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- `useUpdateCoverImage`
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- `useUpdateProfileDetails`
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- `useUpdateFollowPolicy`
  - [ ] sign-less, gas-less (via dispatcher)
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- `useUpdateDispatcherConfig`
  - [ ] signed, gas-less
  - [ ] signed, paid gas (fallback)
- [ ] `useCollectables`
- [ ] `useMutualFollowers`

### Explore

- [x] `useExploreProfiles`
- [ ] `useExplorePublications`

### Feed

- [x] `useFeed`

### Publication

- [x] `usePublication`
- [x] `usePublicationComments`
- [ ] `usePublications`
- [ ] `useCreatePost`
  - [ ] sign-less, gas-less, instant (via Data Availability)
  - [ ] sign-less, gas-less
  - [ ] signed, gas-less
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

### Revenue

- [ ] `usePublicationRevenue`
- [ ] `useProfilePublicationsRevenue`
- [ ] `useProfileFollowsRevenue`

### Search

- [ ] `useSearchPublications`
- [ ] `useSearchProfiles`

### Notifications

- [ ] `useNotifications`
- [ ] `useUnreadNotifications`

### NFTs

- [ ] `useNfts`

## Setup

Install monorepo dependencies by running this command in the root of the project:

```bash
pnpm install
```

Still in the root of the project, run the following command to build the packages:

```bash
pnpm build
```

## Running tests

To run the tests for all packages, run the following command in the repo root:

```bash
pnpm test
```

## Contributing

**NOTE** at this time we are going to ask the community to hold on any pull request with new features until we reach an initial stable release.

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Lens SDK is [MIT licensed](./LICENSE)
