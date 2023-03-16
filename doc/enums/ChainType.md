[lens-sdk](../README.md) / [Exports](../modules.md) / ChainType

# Enumeration: ChainType

ChainType is an enum that represents the different types of chains that we support.

Rather than couple the chain type to the chain id, we use a separate enum to represent the chain type.
At runtime, depending on the consumer application, the same chain type may be mapped to different chain ids.
For example ChainType.POLYGON may be mapped to chain id 137 (Polygon Mainnet) or 80001 (Polygon Mumbai Testnet).

## Table of contents

### Enumeration Members

- [ETHEREUM](ChainType.md#ethereum)
- [POLYGON](ChainType.md#polygon)

## Enumeration Members

### ETHEREUM

• **ETHEREUM** = ``"ethereum"``

#### Defined in

[packages/shared-kernel/src/crypto/ChainType.ts:9](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/ChainType.ts#L9)

___

### POLYGON

• **POLYGON** = ``"polygon"``

#### Defined in

[packages/shared-kernel/src/crypto/ChainType.ts:10](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/ChainType.ts#L10)
