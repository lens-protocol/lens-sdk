# `@lens-protocol/sdk`

The official SDK for the Lens Protocol.

## Initial setup

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

## Troubleshooting

> I'm getting `Parsing error: Cannot read file 'tsconfig.json'. eslint` in package folder

Add `.vscode/settings.json` at the root of this repo with the following content

```
{
  "eslint.workingDirectories": [
    "./packages/react",
    "./packages/shared-kernel"
  ]
}
```
