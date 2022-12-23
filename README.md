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

## Releasing new version

Release flow is managed by [changesets](https://github.com/changesets/changesets).

All publishable monorepo packages follow [`fixed`](https://github.com/changesets/changesets/blob/main/docs/fixed-packages.md) versioning scheme to keep things simple.

To release a new version follow the below steps:

1. Document new public facing changes during development.
```bash
changeset add
```
The command will ask a series of questions related to the introduced changes and the version bump that's required to follow semver range.

2. Once ready to do a release make sure that all libs are properly build (`dist` folders have the most up-to-date code) and the tests/lints are passing.
```bash
## run all from monorepo root
pnpm build

pnpm test

pnpm lint
```

3. Update relevant `package.json`'s versions and update `CHANGELOG.md` for each package.
```bash
changeset version
```

4. Review and commit new release. Create a PR to `main`.

5. Once all the steps above are done we are ready to publish a new release to the registry

*Note: Before publishing make sure that you are logged in to the correct npm account (run `pnpm whoami`). If not, follow prompts from `pnpm login`.*

```bash
changeset publish
```

*Note: Because this command assumes that the last commit is the release commit, you should not commit any changes between calling version and publish.*

6. Don't forget to push git tags after publishing to registry.
```bash
git push --follow-tags
```


## License

Lens SDK is [MIT licensed](./LICENSE)
