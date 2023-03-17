# Module: React Hooks Web

## Common

- [ChainType](../enums/React_Hooks_Web.ChainType.md)
- [BigDecimal](../classes/React_Hooks_Web.BigDecimal.md)

## Enumerations

- [NotificationTypes](../enums/React_Hooks_Web.NotificationTypes.md)
- [PublicationContentWarning](../enums/React_Hooks_Web.PublicationContentWarning.md)
- [PublicationMainFocus](../enums/React_Hooks_Web.PublicationMainFocus.md)
- [PublicationSortCriteria](../enums/React_Hooks_Web.PublicationSortCriteria.md)
- [PublicationTypes](../enums/React_Hooks_Web.PublicationTypes.md)

## Interfaces

- [ICipher](../interfaces/React_Hooks_Web.ICipher.md)
- [IObservableStorageProvider](../interfaces/React_Hooks_Web.IObservableStorageProvider.md)

## Amounts

• **Amount**<`T`\>: `Object`

Amount is a value object representing an amount of given [Asset](React_Hooks_Web.md#asset).

**`Remarks`**

Amount hides all the complexity of dealing with different precision of different assets.
It offers a consistent interface to perform arithmetic operations on amounts.

Amount is immutable. All arithmetic operations return a new Amount instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Asset`](React_Hooks_Web.md#asset) |

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:76](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L76)

• `Private` **Erc20**: `Object`

Erc20 is a value object representing an ERC20 token.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:163](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L163)

• `Private` **Ether**: `Object`

Ether is a value object representing the Ether token.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:83](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L83)

• `Private` **Fiat**: `Object`

Fiat is a value object representing a fiat currency.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:49](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L49)

• `Private` **Matic**: `Object`

Matic is a value object representing the Matic token.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:123](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L123)

### AmountValue

Ƭ **AmountValue**: [`BigDecimal`](../classes/React_Hooks_Web.BigDecimal.md) \| `number` \| `string`

A type alias for a value that can be used to construct an [Amount](../classes/React_Hooks_Web.Amount.md)

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:21](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L21)

___

### Asset

Ƭ **Asset**: [`Fiat`](../classes/React_Hooks_Web.Fiat.md) \| [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Erc20`](../classes/React_Hooks_Web.Erc20.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

Asset is a union of value objects representing currency or token.

**`Remarks`**

Asset instances are immutable and can be compared using reference equality (`===`).

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:209](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L209)

___

### CryptoAmount

Ƭ **CryptoAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`CryptoAsset`](React_Hooks_Web.md#cryptoasset)\>

A convenience type to specify a crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:215](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L215)

___

### CryptoAsset

Ƭ **CryptoAsset**: [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Erc20`](../classes/React_Hooks_Web.Erc20.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

CryptoAsset is a convenience union representing currencies that are blockchain tokens.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:227](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L227)

___

### CryptoNativeAmount

Ƭ **CryptoNativeAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`CryptoNativeAsset`](React_Hooks_Web.md#cryptonativeasset)\>

A convenience type to specify a native crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:221](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L221)

___

### CryptoNativeAsset

Ƭ **CryptoNativeAsset**: [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.

**`Remarks`**

The reason we make a distinction between CryptoAsset and [Asset](React_Hooks_Web.md#asset) is that CryptoAsset are
kind of "special" in that they are the only assets that do not have a canonical contract address
and they are used to pay for gas fees.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:221](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L221)

___

### Erc20Info

Ƭ **Erc20Info**: `Object`

Initialization object for [erc20](React_Hooks_Web.md#erc20) factory function

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainType` | [`ChainType`](../enums/React_Hooks_Web.ChainType.md) |
| `decimals` | `number` |
| `name` | `string` |
| `symbol` | `string` |

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:248](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L248)

___

### FiatAmount

Ƭ **FiatAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`Fiat`](../classes/React_Hooks_Web.Fiat.md)\>

A convenience type to specify a fiat amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:227](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L227)

___

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

___

### erc20

▸ **erc20**(`«destructured»`): [`Erc20`](../classes/React_Hooks_Web.Erc20.md)

Erc20 asset factory function.

Erc20 instances, like all [Asset](React_Hooks_Web.md#asset) instances, are immutable and can be compared using reference equality (`===`).

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Erc20Info`](React_Hooks_Web.md#erc20info) |

#### Returns

[`Erc20`](../classes/React_Hooks_Web.Erc20.md)

An Erc20 instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:265](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L265)

___

### ether

▸ **ether**(): [`Ether`](../classes/React_Hooks_Web.Ether.md)

Ether asset provider function.

There is only one Ether token, so this function returns the same instance every time.

#### Returns

[`Ether`](../classes/React_Hooks_Web.Ether.md)

The Ether instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:293](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L293)

___

### matic

▸ **matic**(): [`Matic`](../classes/React_Hooks_Web.Matic.md)

Matic asset provider function.

There is only one Matic token, so this function returns the same instance every time.

#### Returns

[`Matic`](../classes/React_Hooks_Web.Matic.md)

The Matic instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:279](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L279)

___

### usd

▸ **usd**(): [`Fiat`](../classes/React_Hooks_Web.Fiat.md)

A convenience function to create a Fiat asset for USD.

There is only one USD token, so this function returns the same instance every time.

#### Returns

[`Fiat`](../classes/React_Hooks_Web.Fiat.md)

The USD Fiat instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:307](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L307)

## Type Aliases

### TwoAtLeastArray

Ƭ **TwoAtLeastArray**<`T`\>: `Overwrite`<[`T`, `T`, ...T[]], { `map`: <U\>(`callbackfn`: (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U`, `thisArg?`: `unknown`) => [`TwoAtLeastArray`](React_Hooks_Web.md#twoatleastarray)<`U`\>  }\>

Declares an array of at least two elements of the specified type.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:102](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L102)
