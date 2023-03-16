[lens-sdk](../README.md) / [Exports](../modules.md) / Amount

# Class: Amount<T\>

Amount is a value object representing an amount of given [Asset](../modules.md#asset).

**`Remarks`**

Amount hides all the complexity of dealing with different precision of different assets.
It offers a consistent interface to perform arithmetic operations on amounts.

Amount is immutable. All arithmetic operations return a new Amount instance.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Asset`](../modules.md#asset) |

## Table of contents

### Methods

- [convert](Amount.md#convert)
- [toBigDecimal](Amount.md#tobigdecimal)

## Methods

### convert

▸ **convert**<`C`\>(`rate`): [`Amount`](Amount.md)<`C`\>

Creates a new Amount using the `rate: Amount<C>` as conversion factor.

The new Amount will have the [Asset](../modules.md#asset) of the `rate` parameter.

**`Example`**

Create the USD equivalent of an Ether Amount given the ETH-USD rate:

```ts
const etherAmount = Amount.ether('1'); // Amount<Ether>

const rate = Amount.usd('0.0006'); // Amount<Fiat>

const usdAmount = etherAmount.convert(rate); // Amount<Fiat>
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Asset`](../modules.md#asset) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rate` | [`Amount`](Amount.md)<`C`\> |

#### Returns

[`Amount`](Amount.md)<`C`\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:88](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Amount.ts#L88)

___

### toBigDecimal

▸ **toBigDecimal**(): `BigDecimal`

Return the internal value representation as BigDecimal truncated at the [Asset](../modules.md#asset) max precision.

Use this as your last resource, you should favour the use of Amount arithmetic methods to have a guarantee maximum precision.

**Use at your own risk.**

#### Returns

`BigDecimal`

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:153](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/shared-kernel/src/crypto/Amount.ts#L153)
