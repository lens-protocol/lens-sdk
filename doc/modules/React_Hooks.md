# Module: React Hooks

## Common Enumerations

- [ChainType](../enums/React_Hooks.ChainType.md)

## Other Enumerations

- [NotificationTypes](../enums/React_Hooks.NotificationTypes.md)
- [PublicationContentWarning](../enums/React_Hooks.PublicationContentWarning.md)
- [PublicationMainFocus](../enums/React_Hooks.PublicationMainFocus.md)
- [PublicationSortCriteria](../enums/React_Hooks.PublicationSortCriteria.md)
- [PublicationTypes](../enums/React_Hooks.PublicationTypes.md)

## Common Classes

- [Amount](../classes/React_Hooks.Amount.md)
- [BigDecimal](../classes/React_Hooks.BigDecimal.md)
- [Erc20](../classes/React_Hooks.Erc20.md)
- [Ether](../classes/React_Hooks.Ether.md)
- [Fiat](../classes/React_Hooks.Fiat.md)
- [Matic](../classes/React_Hooks.Matic.md)

## Encryption Interfaces

- [ICipher](../interfaces/React_Hooks.ICipher.md)
- [IEncryptionProvider](../interfaces/React_Hooks.IEncryptionProvider.md)

## Storage Interfaces

- [IObservableStorageProvider](../interfaces/React_Hooks.IObservableStorageProvider.md)

## Common Type Aliases

- [AmountValue](React_Hooks.md#amountvalue)
- [Asset](React_Hooks.md#asset)
- [CryptoAmount](React_Hooks.md#cryptoamount)
- [CryptoAsset](React_Hooks.md#cryptoasset)
- [CryptoNativeAmount](React_Hooks.md#cryptonativeamount)
- [CryptoNativeAsset](React_Hooks.md#cryptonativeasset)
- [Erc20Info](React_Hooks.md#erc20info)
- [FiatAmount](React_Hooks.md#fiatamount)

## Other Type Aliases

- [TwoAtLeastArray](React_Hooks.md#twoatleastarray)

## Common Variables

- [Denomination](React_Hooks.md#denomination)

## Common Functions

- [erc20](React_Hooks.md#erc20)
- [ether](React_Hooks.md#ether)
- [matic](React_Hooks.md#matic)
- [usd](React_Hooks.md#usd)

## Common Type Aliases

### AmountValue

Ƭ **AmountValue**: [`BigDecimal`](../classes/React_Hooks.BigDecimal.md) \| `number` \| `string`

A type alias for a value that can be used to construct an [Amount](../classes/React_Hooks.Amount.md)

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:21](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L21)

___

### Asset

Ƭ **Asset**: [`Fiat`](../classes/React_Hooks.Fiat.md) \| [`Ether`](../classes/React_Hooks.Ether.md) \| [`Erc20`](../classes/React_Hooks.Erc20.md) \| [`Matic`](../classes/React_Hooks.Matic.md)

Asset is a convenience union of value objects representing currency or token.

Asset instances are immutable and can be compared using reference equality (`===`).

**`Param`**

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:212](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L212)

___

### CryptoAmount

Ƭ **CryptoAmount**: [`Amount`](../classes/React_Hooks.Amount.md)<[`CryptoAsset`](React_Hooks.md#cryptoasset)\>

A convenience type to specify a crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:308](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L308)

___

### CryptoAsset

Ƭ **CryptoAsset**: [`Ether`](../classes/React_Hooks.Ether.md) \| [`Erc20`](../classes/React_Hooks.Erc20.md) \| [`Matic`](../classes/React_Hooks.Matic.md)

CryptoAsset is a convenience union representing currencies that are blockchain tokens.

**`Param`**

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:233](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L233)

___

### CryptoNativeAmount

Ƭ **CryptoNativeAmount**: [`Amount`](../classes/React_Hooks.Amount.md)<[`CryptoNativeAsset`](React_Hooks.md#cryptonativeasset)\>

A convenience type to specify a native crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:315](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L315)

___

### CryptoNativeAsset

Ƭ **CryptoNativeAsset**: [`Ether`](../classes/React_Hooks.Ether.md) \| [`Matic`](../classes/React_Hooks.Matic.md)

CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.

**`Param`**

**`Remarks`**

The reason we make a distinction between CryptoAsset and [Asset](React_Hooks.md#asset) is that CryptoAsset are
kind of "special" in that they are the only assets that do not have a canonical contract address
and they are used to pay for gas fees.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:225](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L225)

___

### Erc20Info

Ƭ **Erc20Info**: `Object`

Initialization object for [erc20](React_Hooks.md#erc20) factory function

**`Param`**

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainType` | [`ChainType`](../enums/React_Hooks.ChainType.md) |
| `decimals` | `number` |
| `name` | `string` |
| `symbol` | `string` |

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:255](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L255)

___

### FiatAmount

Ƭ **FiatAmount**: [`Amount`](../classes/React_Hooks.Amount.md)<[`Fiat`](../classes/React_Hooks.Fiat.md)\>

A convenience type to specify a fiat amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:322](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L322)

___

## Other Type Aliases

### TwoAtLeastArray

Ƭ **TwoAtLeastArray**<`T`\>: `Overwrite`<[`T`, `T`, ...T[]], { `map`: <U\>(`callbackfn`: (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U`, `thisArg?`: `unknown`) => [`TwoAtLeastArray`](React_Hooks.md#twoatleastarray)<`U`\>  }\>

Declares an array of at least two elements of the specified type.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:102](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L102)

## Common Variables

### Denomination

• `Const` **Denomination**: `Object`

A set of convenience helpers useful to specify amount values in common denominations.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gwei` | (`value`: [`AmountValue`](React_Hooks.md#amountvalue)) => `Decimal` |
| `wei` | (`value`: [`AmountValue`](React_Hooks.md#amountvalue)) => `Decimal` |

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:28](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L28)

## Common Functions

### erc20

▸ **erc20**(`info`): [`Erc20`](../classes/React_Hooks.Erc20.md)

Erc20 asset factory function.

Erc20 instances, like all [Asset](React_Hooks.md#asset) instances, are immutable and can be compared using reference equality (`===`).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `info` | [`Erc20Info`](React_Hooks.md#erc20info) | [details](React_Hooks.md#erc20info) |

#### Returns

[`Erc20`](../classes/React_Hooks.Erc20.md)

An Erc20 instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:272](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L272)

___

### ether

▸ **ether**(): [`Ether`](../classes/React_Hooks.Ether.md)

Ether asset provider function.

There is only one Ether token, so this function returns the same instance every time.

#### Returns

[`Ether`](../classes/React_Hooks.Ether.md)

The Ether instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:298](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L298)

___

### matic

▸ **matic**(): [`Matic`](../classes/React_Hooks.Matic.md)

Matic asset provider function.

There is only one Matic token, so this function returns the same instance every time.

#### Returns

[`Matic`](../classes/React_Hooks.Matic.md)

The Matic instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:285](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L285)

___

### usd

▸ **usd**(): [`Fiat`](../classes/React_Hooks.Fiat.md)

A convenience function to create a Fiat asset for USD.

There is only one USD token, so this function returns the same instance every time.

#### Returns

[`Fiat`](../classes/React_Hooks.Fiat.md)

The USD Fiat instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:311](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L311)
