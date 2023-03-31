# `@lens-protocol/client`

The official framework-agnostic Lens API Client.

This package enables you to interact with the Lens API via a type safe interface that abstracts away some of the GraphQL intricacies.

## Running tests

Tests are using a real wallet created from a private key stored in `.env` file. Test are run against Mumbai Sandbox API. The private key is set as a secret for Github Actions (our CI). Ask if you need it for local tests.

```
CLIENT_TEST_WALLET_PRIVATE_KEY=
```
