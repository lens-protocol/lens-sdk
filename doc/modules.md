[lens-sdk](README.md) / Exports

# lens-sdk

## Table of contents

### Enumerations

- [ChainType](enums/ChainType.md)
- [NotificationTypes](enums/NotificationTypes.md)
- [PublicationContentWarning](enums/PublicationContentWarning.md)
- [PublicationMainFocus](enums/PublicationMainFocus.md)
- [PublicationSortCriteria](enums/PublicationSortCriteria.md)
- [PublicationTypes](enums/PublicationTypes.md)

### Classes

- [Amount](classes/Amount.md)

### Interfaces

- [ICipher](interfaces/ICipher.md)
- [IObservableStorageProvider](interfaces/IObservableStorageProvider.md)

### Type Aliases

- [Asset](modules.md#asset)
- [CryptoAsset](modules.md#cryptoasset)
- [CryptoNativeAsset](modules.md#cryptonativeasset)
- [TwoAtLeastArray](modules.md#twoatleastarray)

### Variables

- [Denomination](modules.md#denomination)

### Functions

- [erc20](modules.md#erc20)
- [ether](modules.md#ether)
- [matic](modules.md#matic)
- [usd](modules.md#usd)

## Type Aliases

### Asset

Ƭ **Asset**: `Fiat` \| `Ether` \| `Erc20` \| `Matic`

Asset is a union of value objects representing currency or token.

**`Remarks`**

Asset instances are immutable and can be compared using reference equality (`===`).

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:199](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L199)

___

### CryptoAsset

Ƭ **CryptoAsset**: `Ether` \| `Erc20` \| `Matic`

CryptoAsset is a convenience union representing currencies that are blockchain tokens.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:215](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L215)

___

### CryptoNativeAsset

Ƭ **CryptoNativeAsset**: `Ether` \| `Matic`

CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.

**`Remarks`**

The reason we make a distinction between CryptoAsset and [Asset](modules.md#asset) is that CryptoAsset are
kind of "special" in that they are the only assets that do not have a canonical contract address
and they are used to pay for gas fees.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:210](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L210)

___

### TwoAtLeastArray

Ƭ **TwoAtLeastArray**<`T`\>: `Overwrite`<[`T`, `T`, ...T[]], { `map`: <U\>(`callbackfn`: (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U`, `thisArg?`: `unknown`) => [`TwoAtLeastArray`](modules.md#twoatleastarray)<`U`\>  }\>

Declares an array of at least two elements of the specified type.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:102](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/ts-helpers/types.ts#L102)

## Variables

### Denomination

• `Const` **Denomination**: `Object`

A set of convenience helpers useful to specify amount values in common denominations.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gwei` | (`value`: `AmountValue`) => `Decimal` |
| `wei` | (`value`: `AmountValue`) => `Decimal` |

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:21](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Amount.ts#L21)

## Functions

### erc20

▸ **erc20**(`«destructured»`): `Erc20`

Erc20 asset factory function.

Erc20 instances, like all [Asset](modules.md#asset) instances, are immutable and can be compared using reference equality (`===`).

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Erc20Info` |

#### Returns

`Erc20`

An Erc20 instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:249](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L249)

___

### ether

▸ **ether**(): `Ether`

Ether asset provider function.

There is only one Ether token, so this function returns the same instance every time.

#### Returns

`Ether`

The Ether instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:273](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L273)

___

### matic

▸ **matic**(): `Matic`

Matic asset provider function.

There is only one Matic token, so this function returns the same instance every time.

#### Returns

`Matic`

The Matic instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:261](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L261)

___

### usd

▸ **usd**(): `Fiat`

A convenience function to create a Fiat asset for USD.

There is only one USD token, so this function returns the same instance every time.

#### Returns

`Fiat`

The USD Fiat instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:285](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Asset.ts#L285)
