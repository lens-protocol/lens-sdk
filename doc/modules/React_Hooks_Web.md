# Module: React Hooks Web

## Common Enumerations

- [ChainType](../enums/React_Hooks_Web.ChainType.md)

## Other Enumerations

- [NotificationTypes](../enums/React_Hooks_Web.NotificationTypes.md)
- [PublicationContentWarning](../enums/React_Hooks_Web.PublicationContentWarning.md)
- [PublicationMainFocus](../enums/React_Hooks_Web.PublicationMainFocus.md)
- [PublicationSortCriteria](../enums/React_Hooks_Web.PublicationSortCriteria.md)
- [PublicationTypes](../enums/React_Hooks_Web.PublicationTypes.md)

## Common Classes

- [Amount](../classes/React_Hooks_Web.Amount.md)
- [BigDecimal](../classes/React_Hooks_Web.BigDecimal.md)
- [Erc20](../classes/React_Hooks_Web.Erc20.md)
- [Ether](../classes/React_Hooks_Web.Ether.md)
- [Fiat](../classes/React_Hooks_Web.Fiat.md)
- [Matic](../classes/React_Hooks_Web.Matic.md)

## Encryption Interfaces

- [ICipher](../interfaces/React_Hooks_Web.ICipher.md)
- [IEncryptionProvider](../interfaces/React_Hooks_Web.IEncryptionProvider.md)

## Storage Interfaces

- [IObservableStorageProvider](../interfaces/React_Hooks_Web.IObservableStorageProvider.md)

## Common Type Aliases

- [AmountValue](React_Hooks_Web.md#amountvalue)
- [Asset](React_Hooks_Web.md#asset)
- [CryptoAmount](React_Hooks_Web.md#cryptoamount)
- [CryptoAsset](React_Hooks_Web.md#cryptoasset)
- [CryptoNativeAmount](React_Hooks_Web.md#cryptonativeamount)
- [CryptoNativeAsset](React_Hooks_Web.md#cryptonativeasset)
- [Erc20Info](React_Hooks_Web.md#erc20info)
- [FiatAmount](React_Hooks_Web.md#fiatamount)

## Other Type Aliases

- [DistributiveOmit](React_Hooks_Web.md#distributiveomit)
- [Overwrite](React_Hooks_Web.md#overwrite)
- [TwoAtLeastArray](React_Hooks_Web.md#twoatleastarray)

## Common Variables

- [Denomination](React_Hooks_Web.md#denomination)

## Common Functions

- [erc20](React_Hooks_Web.md#erc20)
- [ether](React_Hooks_Web.md#ether)
- [matic](React_Hooks_Web.md#matic)
- [usd](React_Hooks_Web.md#usd)

## Common Type Aliases

### AmountValue

Ƭ **AmountValue**: [`BigDecimal`](../classes/React_Hooks_Web.BigDecimal.md) \| `number` \| `string`

A type alias for a value that can be used to construct an [Amount](../classes/React_Hooks_Web.Amount.md)

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:21](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L21)

___

### Asset

Ƭ **Asset**: [`Fiat`](../classes/React_Hooks_Web.Fiat.md) \| [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Erc20`](../classes/React_Hooks_Web.Erc20.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

Asset is a convenience union of value objects representing currency or token.

Asset instances are immutable and can be compared using reference equality (`===`).

**`Param`**

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:212](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L212)

___

### CryptoAmount

Ƭ **CryptoAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`CryptoAsset`](React_Hooks_Web.md#cryptoasset)\>

A convenience type to specify a crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:308](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L308)

___

### CryptoAsset

Ƭ **CryptoAsset**: [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Erc20`](../classes/React_Hooks_Web.Erc20.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

CryptoAsset is a convenience union representing currencies that are blockchain tokens.

**`Param`**

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:233](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L233)

___

### CryptoNativeAmount

Ƭ **CryptoNativeAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`CryptoNativeAsset`](React_Hooks_Web.md#cryptonativeasset)\>

A convenience type to specify a native crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:315](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L315)

___

### CryptoNativeAsset

Ƭ **CryptoNativeAsset**: [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.

**`Param`**

**`Remarks`**

The reason we make a distinction between CryptoAsset and [Asset](React_Hooks_Web.md#asset) is that CryptoAsset are
kind of "special" in that they are the only assets that do not have a canonical contract address
and they are used to pay for gas fees.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:225](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L225)

___

### Erc20Info

Ƭ **Erc20Info**: `Object`

Initialization object for [erc20](React_Hooks_Web.md#erc20) factory function

**`Param`**

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainType` | [`ChainType`](../enums/React_Hooks_Web.ChainType.md) |
| `decimals` | `number` |
| `name` | `string` |
| `symbol` | `string` |

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:255](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L255)

___

### FiatAmount

Ƭ **FiatAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`Fiat`](../classes/React_Hooks_Web.Fiat.md)\>

A convenience type to specify a fiat amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:322](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L322)

___

## Other Type Aliases

### DistributiveOmit

Ƭ **DistributiveOmit**<`T`, `K`\>: `T` extends `any` ? `Omit`<`T`, `K`\> : `never`

Omits properties from an union type, preserving the union.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `any` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:84](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L84)

___

### Overwrite

Ƭ **Overwrite**<`T1`, `T2`\>: [`DistributiveOmit`](React_Hooks_Web.md#distributiveomit)<`T1`, keyof `T2`\> & `T2`

Overwrites properties from T1 with one from T2

**`Example`**

```ts
Overwrite<{ foo: boolean, bar: string }, { foo: number }> // { foo: number, bar: string }
```

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:31](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L31)

___

### TwoAtLeastArray

Ƭ **TwoAtLeastArray**<`T`\>: [`Overwrite`](React_Hooks_Web.md#overwrite)<[`T`, `T`, ...T[]], { `map`: <U\>(`callbackfn`: (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U`, `thisArg?`: `unknown`) => [`TwoAtLeastArray`](React_Hooks_Web.md#twoatleastarray)<`U`\>  }\>

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
| `gwei` | (`value`: [`AmountValue`](React_Hooks_Web.md#amountvalue)) => `Decimal` |
| `wei` | (`value`: [`AmountValue`](React_Hooks_Web.md#amountvalue)) => `Decimal` |

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:28](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L28)

## Common Functions

### erc20

▸ **erc20**(`info`): [`Erc20`](../classes/React_Hooks_Web.Erc20.md)

Erc20 asset factory function.

Erc20 instances, like all [Asset](React_Hooks_Web.md#asset) instances, are immutable and can be compared using reference equality (`===`).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `info` | [`Erc20Info`](React_Hooks_Web.md#erc20info) | [details](React_Hooks_Web.md#erc20info) |

#### Returns

[`Erc20`](../classes/React_Hooks_Web.Erc20.md)

An Erc20 instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:272](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L272)

___

### ether

▸ **ether**(): [`Ether`](../classes/React_Hooks_Web.Ether.md)

Ether asset provider function.

There is only one Ether token, so this function returns the same instance every time.

#### Returns

[`Ether`](../classes/React_Hooks_Web.Ether.md)

The Ether instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:298](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L298)

___

### matic

▸ **matic**(): [`Matic`](../classes/React_Hooks_Web.Matic.md)

Matic asset provider function.

There is only one Matic token, so this function returns the same instance every time.

#### Returns

[`Matic`](../classes/React_Hooks_Web.Matic.md)

The Matic instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:285](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L285)

___

### usd

▸ **usd**(): [`Fiat`](../classes/React_Hooks_Web.Fiat.md)

A convenience function to create a Fiat asset for USD.

There is only one USD token, so this function returns the same instance every time.

#### Returns

[`Fiat`](../classes/React_Hooks_Web.Fiat.md)

The USD Fiat instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:311](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L311)
