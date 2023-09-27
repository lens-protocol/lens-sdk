# `@lens-protocol/api-bindings`

This package provides the tooling to interact with the Lens Protocol API. **It is not intended to be used directly.**

**Its interface will change without notice, use it at your own risk.**

### Important notes

`react` and `react-dom` is required to be in `devDependencies` to avoid having duplicated `@apollo/client` due to unmatched optional `peerDependencies` between `@lens-protocol/api-bindings` and `@lens-protocol/react`. See https://github.com/pnpm/pnpm/issues/5351 for more details.
