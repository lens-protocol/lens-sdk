# Class: Amount<T\>

[React Hooks](../modules/React_Hooks.md).Amount

Amount is a value object representing an amount of given [Asset](../modules/React_Hooks.md#asset).

**`Remarks`**

Amount hides all the complexity of dealing with different precision of different assets.
It offers a consistent interface to perform arithmetic operations on amounts.

Amount is immutable. All arithmetic operations return a new Amount instance.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Asset`](../modules/React_Hooks.md#asset) |

## Methods

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

| Name | Type |
| :------ | :------ |
| `C` | extends [`Asset`](../modules/React_Hooks.md#asset) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rate` | [`Amount`](React_Hooks.Amount.md)<`C`\> |

#### Returns

[`Amount`](React_Hooks.Amount.md)<`C`\>

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:95](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L95)

___

### toBigDecimal

▸ **toBigDecimal**(): [`BigDecimal`](React_Hooks.BigDecimal.md)

Return the internal value representation as BigDecimal truncated at the [Asset](../modules/React_Hooks.md#asset) max precision.

Use this as your last resource, you should favour the use of Amount arithmetic methods to have a guarantee maximum precision.

**Use at your own risk.**

#### Returns

[`BigDecimal`](React_Hooks.BigDecimal.md)

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:160](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L160)
