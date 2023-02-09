<p>
  <picture>
    <img alt="Lens SDK logo" src="./assets/logo-full.svg" width="100%">
  </picture>
</p>

The official SDK for the [Lens Protocol](https://www.lens.xyz/) 🌿.

> **Warning**
>
> **The Lens SDK is still in its initial development phase**. Anything MAY change at any time.
> This is a Developer Preview aimed primarily at existing integrators so to gather [early feedback](https://github.com/lens-protocol/lens-sdk/discussions/48).

- [Documentation](#documentation)
- [Road Map](#road-map)
- [Contributing](#contributing)
  - [Setup](#setup)
  - [Running tests](#running-tests)
- [Releasing new version](#releasing-new-version)
- [License](#license)
- [Support](#support)

## Documentation

All Lens Protocol documentation, including this SDK documentation can be found at: https://docs.lens.xyz/docs

- [Introduction](https://docs.lens.xyz/docs/sdk-react-intro)
- [Getting Started](https://docs.lens.xyz/docs/sdk-react-getting-started)

## Road Map

- Release 1.0: initial stable release.
- Release 1.1: Low-level API abstraction client (name to be decided).
- Release 1.2: support for Data Availability posts.
- Release 1.3: integration with Lens Gated SDK.

**Note**: This road map is subject to change and is provided for informational purposes only.

## Contributing

> **Note**
>
> At this time we are going to ask the community to hold on any pull requests until we reach an initial stable release (1.x).

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change (issues template will be provided)

### Setup

Install monorepo dependencies by running this command in the root of the project:

```bash
pnpm install
```

Still in the root of the project, run the following command to build the packages:

```bash
pnpm build
```

### Running tests

To run the tests for all packages, run the following command in the repo root:

```bash
pnpm test
```

### Deduplicating dependencies

To check if there are unneeded duplicates run:

```bash
pnpm deduplicate:check
```

To fix all duplicates run:

```bash
pnpm deduplicate:fix
```

## Releasing new version

Release flow is managed by [changesets](https://github.com/changesets/changesets).

All publishable monorepo packages follow [`fixed`](https://github.com/changesets/changesets/blob/main/docs/fixed-packages.md) versioning scheme to keep things simple.

To release a new version follow the steps below:

1. Document new public facing changes during development.

```bash
pnpm changeset add
```

The command will ask a series of questions related to the introduced changes and the version bump that's required to follow semver range.

2. Once ready to do a release make sure that all libs are properly built (`dist` folders have the most up-to-date code) and the tests/lints are passing.

```bash
## run all from monorepo root
pnpm build

pnpm test

pnpm lint
```

3. Update relevant `package.json`'s versions and update `CHANGELOG.md` for each package.

```bash
pnpm changeset version
```

4. Review and commit new release. Create a PR to `main`.

5. Once all the steps above are done we are ready to publish a new release to the registry

_Note: Before publishing make sure that you are logged in to the correct npm account (run `pnpm whoami`). If not, follow prompts from `pnpm login`._

```bash
pnpm changeset publish
```

_Note: Because this command assumes that the last commit is the release commit, you should not commit any changes between calling version and publish._

6. Don't forget to push git tags after publishing to registry.

```bash
git push --follow-tags
```

## License

Lens SDK is [MIT licensed](./LICENSE)

## Support

See the Lens API and SDK channel on our [Discord](https://discord.gg/lensprotocol)
