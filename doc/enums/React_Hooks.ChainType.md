# Enumeration: ChainType

[React Hooks](../modules/React_Hooks.md).ChainType

ChainType is an enum that represents the different types of chains that we support.

Rather than couple the chain type to the chain id, we use a separate enum to represent the chain type.
At runtime, depending on the consumer application, the same chain type may be mapped to different chain ids.
For example ChainType.POLYGON may be mapped to chain id 137 (Polygon Mainnet) or 80001 (Polygon Mumbai Testnet).

This allows consumer to express logic that is bound to the nature of the chain but not to a specific chain id, so that
the same logic can be deployed into a testing, staging or production environment without having to change the code or
account for the different chain ids associated with each environment.

## Enumeration Members

### ETHEREUM

• **ETHEREUM** = ``"ethereum"``

#### Defined in

[packages/shared-kernel/src/crypto/ChainType.ts:15](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/ChainType.ts#L15)

___

### POLYGON

• **POLYGON** = ``"polygon"``

#### Defined in

[packages/shared-kernel/src/crypto/ChainType.ts:16](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/ChainType.ts#L16)
