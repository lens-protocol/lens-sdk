# Class: Amount<T\>

Amount is a value object representing an amount of given [Asset](../README.md#asset).

**`Remarks`**

Amount hides all the complexity of dealing with different precision of different assets.
It offers a consistent interface to perform arithmetic operations on amounts.

Amount is immutable. All arithmetic operations return a new Amount instance.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`Asset`](../README.md#asset) | The [Asset](../README.md#asset) type of the amount. |

## Table of contents

### Properties

- [asset](Amount.md#asset)

### Methods

- [add](Amount.md#add)
- [clone](Amount.md#clone)
- [convert](Amount.md#convert)
- [div](Amount.md#div)
- [eq](Amount.md#eq)
- [gt](Amount.md#gt)
- [gte](Amount.md#gte)
- [isZero](Amount.md#iszero)
- [lt](Amount.md#lt)
- [lte](Amount.md#lte)
- [mul](Amount.md#mul)
- [sub](Amount.md#sub)
- [toBigDecimal](Amount.md#tobigdecimal)
- [toFixed](Amount.md#tofixed)
- [toNumber](Amount.md#tonumber)
- [toSignificantDigits](Amount.md#tosignificantdigits)
- [erc20](Amount.md#erc20)
- [ether](Amount.md#ether)
- [matic](Amount.md#matic)
- [usd](Amount.md#usd)

## Properties

### asset

• `Readonly` **asset**: `T`

## Methods

### add

▸ **add**(`amount`): [`Amount`](Amount.md)<`T`\>

Sum of two Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

[`Amount`](Amount.md)<`T`\>

a new Amount that is the sum of this Amount and the `amount` parameter.

___

### clone

▸ **clone**(`value`): [`Amount`](Amount.md)<`T`\>

Creates an Amount of the same [Asset](../README.md#asset) with the new specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<`T`\>

a new Amount with the same [Asset](../README.md#asset) and the new `value`.

___

### convert

▸ **convert**<`C`\>(`rate`): [`Amount`](Amount.md)<`C`\>

Creates a new Amount using the `rate: Amount<C>` as conversion factor.

The new Amount will have the [Asset](../README.md#asset) of the `rate` parameter.

**`Example`**

Create the USD equivalent of an Ether Amount given the ETH-USD rate:

```ts
const etherAmount = Amount.ether('1'); // Amount<Ether>

const rate = Amount.usd('0.0006'); // Amount<Fiat>

const usdAmount = etherAmount.convert(rate); // Amount<Fiat>
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `C` | extends [`Asset`](../README.md#asset) | The [Asset](../README.md#asset) type to convert to. |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rate` | [`Amount`](Amount.md)<`C`\> |

#### Returns

[`Amount`](Amount.md)<`C`\>

___

### div

▸ **div**(`divisor`): [`Amount`](Amount.md)<`T`\>

Quotient of an Amount and a scalar divisor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `divisor` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<`T`\>

a new Amount that is the quotient of this Amount and the `divisor` parameter.

___

### eq

▸ **eq**(`amount`): `boolean`

Equality check for Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is equal to the `amount` parameter.

___

### gt

▸ **gt**(`amount`): `boolean`

Greater than check for Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is greater than the `amount` parameter.

___

### gte

▸ **gte**(`amount`): `boolean`

Greater than or equal check for Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is greater than or equal to the `amount` parameter.

___

### isZero

▸ **isZero**(): `boolean`

Convenience method to check if the Amount value is zero.

#### Returns

`boolean`

`true` if the Amount value is zero.

___

### lt

▸ **lt**(`amount`): `boolean`

Less than check for Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is less than the `amount` parameter.

___

### lte

▸ **lte**(`amount`): `boolean`

Less than or equal check for Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is less than or equal to the `amount` parameter.

___

### mul

▸ **mul**(`factor`): [`Amount`](Amount.md)<`T`\>

Product of an Amount and a scalar factor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<`T`\>

a new Amount that is the product of this Amount and the `factor` parameter.

___

### sub

▸ **sub**(`amount`): [`Amount`](Amount.md)<`T`\>

Difference of two Amounts of the same [Asset](../README.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](Amount.md)<`T`\> |

#### Returns

[`Amount`](Amount.md)<`T`\>

a new Amount that is the difference of this Amount and the `amount` parameter.

___

### toBigDecimal

▸ **toBigDecimal**(): [`BigDecimal`](BigDecimal.md)

Converts the internal value as [BigDecimal](BigDecimal.md) truncated at the [Asset](../README.md#asset) max precision.

Use this as your last resource, you should favour the use of Amount arithmetic methods to have a guarantee maximum precision.

**Use at your own risk.**

#### Returns

[`BigDecimal`](BigDecimal.md)

___

### toFixed

▸ **toFixed**(`decimals?`): `string`

Formats the Amount value using fixed-point notation.

Optionally you can specify the number of decimals to return.

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimals` | `number` |

#### Returns

`string`

the internal value as `string` truncated at this Amount [Asset](../README.md#asset) max precision.

___

### toNumber

▸ **toNumber**(): `number`

Converts the Amount value as less safe JS `number`.

**Use at your own risk.**

Type coercion with, for example, JavaScript's unary plus operator will also work.

#### Returns

`number`

the internal value as `number` that has the potential to lose precision.

___

### toSignificantDigits

▸ **toSignificantDigits**(`significantDigits?`): `string`

Formats the Amount value to its maximum precision using a fixed-point notation.

Optionally you can specify the number of significant digits to approximate the value to.

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |

#### Returns

`string`

the internal value as `string` truncated at this Amount [Asset](../README.md#asset) max precision.

___

### erc20

▸ `Static` **erc20**<`T`\>(`asset`, `value`): [`Amount`](Amount.md)<`T`\>

Creates an Amount of the specified [Erc20](Erc20.md) with the specified `value`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Erc20`](Erc20.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | `T` |
| `value` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<`T`\>

___

### ether

▸ `Static` **ether**(`value`): [`Amount`](Amount.md)<[`Ether`](Ether.md)\>

Creates an [Ether](Ether.md) Amount with the specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<[`Ether`](Ether.md)\>

___

### matic

▸ `Static` **matic**(`value`): [`Amount`](Amount.md)<[`Matic`](Matic.md)\>

Creates an [Matic](Matic.md) Amount with the specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<[`Matic`](Matic.md)\>

___

### usd

▸ `Static` **usd**(`value`): [`Amount`](Amount.md)<[`Fiat`](Fiat.md)\>

Creates an USD [Fiat](Fiat.md) Amount with the specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../README.md#amountvalue) |

#### Returns

[`Amount`](Amount.md)<[`Fiat`](Fiat.md)\>
