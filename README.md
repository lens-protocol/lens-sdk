# Lens SDK

The official SDK for the Lens 🌿.

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Installation

## Development Workflow

This section is for developers who want to contribute to the SDK.

### Initial Setup <!-- omit in toc -->

Clone the repository:

```bash
git clone https://github.com/lens-network/sdk.git
```

Install the dependencies:

```bash
pnpm install
```

### Pre-requisites: <!-- omit in toc -->

- Node.js: >= v20. See [installation guide](https://nodejs.org/en/download/package-manager).
- pnpm: v9.1.2. See [installation guide](https://pnpm.io/installation).

Use [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions. Run the following command in the project root folder:

```bash
nvm use
```

to switch to the correct Node.js version.

Enable [corepack](https://www.totaltypescript.com/how-to-use-corepack) to use the correct version of `pnpm`.

Run the following command in the project root folder:

```bash
corepack install
```

to install the correct version once. After that corepack will automatically use the correct version of `pnpm` when entering the project folder.

### Usage <!-- omit in toc -->

Run the tests:

- `pnpm test:client`: Run the tests for the `@lens-protocol/client` package.

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

Create a new package:

```bash
pnpm new:package
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

## Troubleshooting

### Incompatible Types Across Packages <!-- omit in toc -->

Working within a monorepo can sometimes lead to type incompatibilities across packages. If you encounter an error like:

```bash
Type 'import("[...]/packages/client/dist/index").PublicClient<import("[...]/packages/client/dist/index").Context>' is not assignable to type 'import("[...]/packages/client/src/clients").PublicClient<import("[...]/packages/client/src/context").Context>'.
```

This usually indicates that TypeScript is picking up types from different versions of the same package. To resolve this, make sure you have configured the entry points correctly as aliases in the top level `tsconfig.json` file.

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "skipLibCheck": true,
    "types": ["node"],
    "paths": {
      "@lens-protocol/client": ["./packages/client/src"],
      "@lens-protocol/client/actions": ["./packages/client/src/actions"],
      "@lens-protocol/client/test-utils": ["./packages/client/src/test-utils"],
      "@lens-protocol/env": ["./packages/env/src"],
      "@lens-protocol/graphql": ["./packages/graphql/src"],
      "@lens-protocol/react": ["./packages/react/src"],
      "@lens-protocol/storage": ["./packages/storage/src"],
      "@lens-protocol/types": ["./packages/types/src"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

## Contributing

We are currently focused on launching Lens Network mainnet and Lens Protocol v3. We are not able to accept contributions at this time. We will update this section in due course.

If you have a pressing issue or feature request, please open an issue on GitHub.

## License

Lens SDK is [MIT licensed](./LICENSE).
