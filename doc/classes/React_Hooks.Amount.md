# Class: Amount<T\>

[React Hooks](../modules/React_Hooks.md).Amount

Amount is a value object representing an amount of given [Asset](../modules/React_Hooks.md#asset).

**`Remarks`**

Amount hides all the complexity of dealing with different precision of different assets.
It offers a consistent interface to perform arithmetic operations on amounts.

Amount is immutable. All arithmetic operations return a new Amount instance.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`Asset`](../modules/React_Hooks.md#asset) | The [Asset](../modules/React_Hooks.md#asset) type of the amount. |

## Methods

### add

▸ **add**(`amount`): [`Amount`](React_Hooks.Amount.md)<`T`\>

Sum of two Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`T`\>

a new Amount that is the sum of this Amount and the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:159](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L159)

___

### clone

▸ **clone**(`value`): [`Amount`](React_Hooks.Amount.md)<`T`\>

Creates an Amount of the same [Asset](../modules/React_Hooks.md#asset) with the new specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`T`\>

a new Amount with the same [Asset](../modules/React_Hooks.md#asset) and the new `value`.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:260](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L260)

___

### convert

▸ **convert**<`C`\>(`rate`): [`Amount`](React_Hooks.Amount.md)<`C`\>

Creates a new Amount using the `rate: Amount<C>` as conversion factor.

The new Amount will have the [Asset](../modules/React_Hooks.md#asset) of the `rate` parameter.

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
| `C` | extends [`Asset`](../modules/React_Hooks.md#asset) | The [Asset](../modules/React_Hooks.md#asset) type to convert to. |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rate` | [`Amount`](React_Hooks.Amount.md)<`C`\> |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`C`\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:97](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L97)

___

### div

▸ **div**(`divisor`): [`Amount`](React_Hooks.Amount.md)<`T`\>

Quotient of an Amount and a scalar divisor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `divisor` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`T`\>

a new Amount that is the quotient of this Amount and the `divisor` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:194](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L194)

___

### eq

▸ **eq**(`amount`): `boolean`

Equality check for Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is equal to the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:106](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L106)

___

### gt

▸ **gt**(`amount`): `boolean`

Greater than check for Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is greater than the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:115](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L115)

___

### gte

▸ **gte**(`amount`): `boolean`

Greater than or equal check for Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is greater than or equal to the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:128](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L128)

___

### isZero

▸ **isZero**(): `boolean`

Convenience method to check if the Amount value is zero.

#### Returns

`boolean`

`true` if the Amount value is zero.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:251](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L251)

___

### lt

▸ **lt**(`amount`): `boolean`

Less than check for Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is less than the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:141](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L141)

___

### lte

▸ **lte**(`amount`): `boolean`

Less than or equal check for Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

`boolean`

`true` if this Amount is less than or equal to the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:150](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L150)

___

### mul

▸ **mul**(`factor`): [`Amount`](React_Hooks.Amount.md)<`T`\>

Product of an Amount and a scalar factor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`T`\>

a new Amount that is the product of this Amount and the `factor` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:185](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L185)

___

### sub

▸ **sub**(`amount`): [`Amount`](React_Hooks.Amount.md)<`T`\>

Difference of two Amounts of the same [Asset](../modules/React_Hooks.md#asset).

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`Amount`](React_Hooks.Amount.md)<`T`\> |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`T`\>

a new Amount that is the difference of this Amount and the `amount` parameter.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:172](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L172)

___

### toBigDecimal

▸ **toBigDecimal**(): [`BigDecimal`](React_Hooks.BigDecimal.md)

Converts the internal value as [BigDecimal](React_Hooks.BigDecimal.md) truncated at the [Asset](../modules/React_Hooks.md#asset) max precision.

Use this as your last resource, you should favour the use of Amount arithmetic methods to have a guarantee maximum precision.

**Use at your own risk.**

#### Returns

[`BigDecimal`](React_Hooks.BigDecimal.md)

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:207](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L207)

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

the internal value as `string` truncated at this Amount [Asset](../modules/React_Hooks.md#asset) max precision.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:218](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L218)

___

### toNumber

▸ **toNumber**(): `number`

Converts the Amount value as less safe JS `number`.

**Use at your own risk.**

Type coercion with, for example, JavaScript's unary plus operator will also work.

#### Returns

`number`

the internal value as `number` that has the potential to lose precision.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:242](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L242)

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

the internal value as `string` truncated at this Amount [Asset](../modules/React_Hooks.md#asset) max precision.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:229](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L229)

___

### erc20

▸ `Static` **erc20**<`T`\>(`asset`, `value`): [`Amount`](React_Hooks.Amount.md)<`T`\>

Creates an Amount of the specified [Erc20](React_Hooks.Erc20.md) with the specified `value`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Erc20`](React_Hooks.Erc20.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | `T` |
| `value` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`T`\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:277](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L277)

___

### ether

▸ `Static` **ether**(`value`): [`Amount`](React_Hooks.Amount.md)<[`Ether`](React_Hooks.Ether.md)\>

Creates an [Ether](React_Hooks.Ether.md) Amount with the specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<[`Ether`](React_Hooks.Ether.md)\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:284](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L284)

___

### matic

▸ `Static` **matic**(`value`): [`Amount`](React_Hooks.Amount.md)<[`Matic`](React_Hooks.Matic.md)\>

Creates an [Matic](React_Hooks.Matic.md) Amount with the specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<[`Matic`](React_Hooks.Matic.md)\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:298](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L298)

___

### usd

▸ `Static` **usd**(`value`): [`Amount`](React_Hooks.Amount.md)<[`Fiat`](React_Hooks.Fiat.md)\>

Creates an USD [Fiat](React_Hooks.Fiat.md) Amount with the specified `value`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`AmountValue`](../modules/React_Hooks.md#amountvalue) |

#### Returns

[`Amount`](React_Hooks.Amount.md)<[`Fiat`](React_Hooks.Fiat.md)\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:291](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L291)
