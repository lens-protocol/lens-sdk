# Lens Social SDK

The official SDK for the Lens Social 🌿.

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

## Installation

## Development Workflow

This section is for developers who want to contribute to the SDK.

### Pre-requisites: <!-- omit in toc -->

- Node.js: >= v20. See [installation guide](https://nodejs.org/en/download/package-manager).
- pnpm: v9.1.2. See [installation guide](https://pnpm.io/installation).

If you use [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions, you can run:

```bash
nvm use
```

to switch to the correct Node.js version.

We recommend enabling [corepack](https://www.totaltypescript.com/how-to-use-corepack) to automatically use the correct version of `pnpm` when entering the project folder.

### Initial Setup <!-- omit in toc -->

Clone the repository:

```bash
git clone https://github.com/lens-network/sdk.git
```

Install the dependencies:

```bash
pnpm install
```

### Usage <!-- omit in toc -->

Run the tests:

```bash
pnpm test
```

Lint the code:

```bash
pnpm lint
```

Compile the code:

```bash
pnpm build
```

Clean the build:

```bash
pnpm clean
```

### IDE Setup <!-- omit in toc -->

The project uses [Biome](https://biomejs.dev/) to format and lint the code. You can install the Biome extension for your IDE: https://biomejs.dev/guides/editors/first-party-extensions/

### Publishing <!-- omit in toc -->

1. Create a new release branch using the `release/X.Y.Z` naming convention.
2. Bumps up version number and updates the changelog.

   ```bash
   pnpm changeset version
   ```

3. Commit the changes using `chore: bumps up version number` as the commit message.
4. Push the changes to the remote repository.
5. Open a pull request to the `main` branch.
6. Wait for all checks to pass and for the pull request to be approved.
7. Publish the package.

   ```bash
   pnpm changeset publish
   ```

8. Push tags to the remote repository.

   ```bash
   git push --follow-tags
   ```

9. Merge the pull request to the `main` branch.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Lens Social SDK is [MIT licensed](./LICENSE).
