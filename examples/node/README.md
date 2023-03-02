# Lens Client SDK + Node.js

This package is a collection of simple node.js scripts showcasing the `@lens-protocol/client` capabilities.

## Getting Started

Some scripts require a wallet to authenticate the LensClient. Copy `.env.example` file to `.env` and define the private key for the wallet you want to use with the scripts. Best is to create a new wallet just for playing with the scripts. You don't need any funds in that wallet to test LensClient SDK.

You can run each script individually via:

```bash
pnpm ts-node PATH_TO_THE_SCRIPT
```

i.e.

```bash
pnpm ts-node ./scripts/authenticate.ts
```

Ensure you previously built all the dependencies. See [main setup](../../README.md#setup).
