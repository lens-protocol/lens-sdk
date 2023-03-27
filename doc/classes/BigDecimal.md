# Class: BigDecimal

BigDecimal is a value object representing an high precision decimal number.

## Hierarchy

- `Decimal`<`this`\>

  ↳ **`BigDecimal`**

## Table of contents

### Constructors

- [constructor](BigDecimal.md#constructor)

### Properties

- [d](BigDecimal.md#d)
- [e](BigDecimal.md#e)
- [s](BigDecimal.md#s)
- [Decimal](BigDecimal.md#decimal)
- [EUCLID](BigDecimal.md#euclid)
- [ROUND\_CEIL](BigDecimal.md#round_ceil)
- [ROUND\_DOWN](BigDecimal.md#round_down)
- [ROUND\_FLOOR](BigDecimal.md#round_floor)
- [ROUND\_HALF\_CEIL](BigDecimal.md#round_half_ceil)
- [ROUND\_HALF\_DOWN](BigDecimal.md#round_half_down)
- [ROUND\_HALF\_EVEN](BigDecimal.md#round_half_even)
- [ROUND\_HALF\_FLOOR](BigDecimal.md#round_half_floor)
- [ROUND\_HALF\_UP](BigDecimal.md#round_half_up)
- [ROUND\_UP](BigDecimal.md#round_up)
- [crypto](BigDecimal.md#crypto)
- [default](BigDecimal.md#default)
- [maxE](BigDecimal.md#maxe)
- [minE](BigDecimal.md#mine)
- [modulo](BigDecimal.md#modulo)
- [precision](BigDecimal.md#precision)
- [rounding](BigDecimal.md#rounding)
- [toExpNeg](BigDecimal.md#toexpneg)
- [toExpPos](BigDecimal.md#toexppos)

### Methods

- [abs](BigDecimal.md#abs)
- [absoluteValue](BigDecimal.md#absolutevalue)
- [acos](BigDecimal.md#acos)
- [acosh](BigDecimal.md#acosh)
- [add](BigDecimal.md#add)
- [asin](BigDecimal.md#asin)
- [asinh](BigDecimal.md#asinh)
- [atan](BigDecimal.md#atan)
- [atanh](BigDecimal.md#atanh)
- [cbrt](BigDecimal.md#cbrt)
- [ceil](BigDecimal.md#ceil)
- [clamp](BigDecimal.md#clamp)
- [clampedTo](BigDecimal.md#clampedto)
- [cmp](BigDecimal.md#cmp)
- [comparedTo](BigDecimal.md#comparedto)
- [cos](BigDecimal.md#cos)
- [cosh](BigDecimal.md#cosh)
- [cosine](BigDecimal.md#cosine)
- [cubeRoot](BigDecimal.md#cuberoot)
- [decimalPlaces](BigDecimal.md#decimalplaces)
- [div](BigDecimal.md#div)
- [divToInt](BigDecimal.md#divtoint)
- [dividedBy](BigDecimal.md#dividedby)
- [dividedToIntegerBy](BigDecimal.md#dividedtointegerby)
- [dp](BigDecimal.md#dp)
- [eq](BigDecimal.md#eq)
- [equals](BigDecimal.md#equals)
- [exp](BigDecimal.md#exp)
- [floor](BigDecimal.md#floor)
- [greaterThan](BigDecimal.md#greaterthan)
- [greaterThanOrEqualTo](BigDecimal.md#greaterthanorequalto)
- [gt](BigDecimal.md#gt)
- [gte](BigDecimal.md#gte)
- [hyperbolicCosine](BigDecimal.md#hyperboliccosine)
- [hyperbolicSine](BigDecimal.md#hyperbolicsine)
- [hyperbolicTangent](BigDecimal.md#hyperbolictangent)
- [inverseCosine](BigDecimal.md#inversecosine)
- [inverseHyperbolicCosine](BigDecimal.md#inversehyperboliccosine)
- [inverseHyperbolicSine](BigDecimal.md#inversehyperbolicsine)
- [inverseHyperbolicTangent](BigDecimal.md#inversehyperbolictangent)
- [inverseSine](BigDecimal.md#inversesine)
- [inverseTangent](BigDecimal.md#inversetangent)
- [isFinite](BigDecimal.md#isfinite)
- [isInt](BigDecimal.md#isint)
- [isInteger](BigDecimal.md#isinteger)
- [isNaN](BigDecimal.md#isnan)
- [isNeg](BigDecimal.md#isneg)
- [isNegative](BigDecimal.md#isnegative)
- [isPos](BigDecimal.md#ispos)
- [isPositive](BigDecimal.md#ispositive)
- [isZero](BigDecimal.md#iszero)
- [lessThan](BigDecimal.md#lessthan)
- [lessThanOrEqualTo](BigDecimal.md#lessthanorequalto)
- [ln](BigDecimal.md#ln)
- [log](BigDecimal.md#log)
- [logarithm](BigDecimal.md#logarithm)
- [lt](BigDecimal.md#lt)
- [lte](BigDecimal.md#lte)
- [minus](BigDecimal.md#minus)
- [mod](BigDecimal.md#mod)
- [modulo](BigDecimal.md#modulo-1)
- [mul](BigDecimal.md#mul)
- [naturalExponential](BigDecimal.md#naturalexponential)
- [naturalLogarithm](BigDecimal.md#naturallogarithm)
- [neg](BigDecimal.md#neg)
- [negated](BigDecimal.md#negated)
- [plus](BigDecimal.md#plus)
- [pow](BigDecimal.md#pow)
- [precision](BigDecimal.md#precision-1)
- [round](BigDecimal.md#round)
- [sd](BigDecimal.md#sd)
- [sin](BigDecimal.md#sin)
- [sine](BigDecimal.md#sine)
- [sinh](BigDecimal.md#sinh)
- [sqrt](BigDecimal.md#sqrt)
- [squareRoot](BigDecimal.md#squareroot)
- [sub](BigDecimal.md#sub)
- [tan](BigDecimal.md#tan)
- [tangent](BigDecimal.md#tangent)
- [tanh](BigDecimal.md#tanh)
- [times](BigDecimal.md#times)
- [toBinary](BigDecimal.md#tobinary)
- [toDP](BigDecimal.md#todp)
- [toDecimalPlaces](BigDecimal.md#todecimalplaces)
- [toExponential](BigDecimal.md#toexponential)
- [toFixed](BigDecimal.md#tofixed)
- [toFraction](BigDecimal.md#tofraction)
- [toHex](BigDecimal.md#tohex)
- [toHexadecimal](BigDecimal.md#tohexadecimal)
- [toJSON](BigDecimal.md#tojson)
- [toNearest](BigDecimal.md#tonearest)
- [toNumber](BigDecimal.md#tonumber)
- [toOctal](BigDecimal.md#tooctal)
- [toPower](BigDecimal.md#topower)
- [toPrecision](BigDecimal.md#toprecision)
- [toSD](BigDecimal.md#tosd)
- [toSignificantDigits](BigDecimal.md#tosignificantdigits)
- [toString](BigDecimal.md#tostring)
- [trunc](BigDecimal.md#trunc)
- [truncated](BigDecimal.md#truncated)
- [valueOf](BigDecimal.md#valueof)
- [abs](BigDecimal.md#abs-1)
- [acos](BigDecimal.md#acos-1)
- [acosh](BigDecimal.md#acosh-1)
- [add](BigDecimal.md#add-1)
- [asin](BigDecimal.md#asin-1)
- [asinh](BigDecimal.md#asinh-1)
- [atan](BigDecimal.md#atan-1)
- [atan2](BigDecimal.md#atan2)
- [atanh](BigDecimal.md#atanh-1)
- [cbrt](BigDecimal.md#cbrt-1)
- [ceil](BigDecimal.md#ceil-1)
- [clamp](BigDecimal.md#clamp-1)
- [clone](BigDecimal.md#clone)
- [config](BigDecimal.md#config)
- [cos](BigDecimal.md#cos-1)
- [cosh](BigDecimal.md#cosh-1)
- [div](BigDecimal.md#div-1)
- [exp](BigDecimal.md#exp-1)
- [floor](BigDecimal.md#floor-1)
- [from](BigDecimal.md#from)
- [hypot](BigDecimal.md#hypot)
- [isDecimal](BigDecimal.md#isdecimal)
- [ln](BigDecimal.md#ln-1)
- [log](BigDecimal.md#log-1)
- [log10](BigDecimal.md#log10)
- [log2](BigDecimal.md#log2)
- [max](BigDecimal.md#max)
- [mean](BigDecimal.md#mean)
- [min](BigDecimal.md#min)
- [mod](BigDecimal.md#mod-1)
- [mul](BigDecimal.md#mul-1)
- [noConflict](BigDecimal.md#noconflict)
- [pow](BigDecimal.md#pow-1)
- [random](BigDecimal.md#random)
- [rescale](BigDecimal.md#rescale)
- [round](BigDecimal.md#round-1)
- [set](BigDecimal.md#set)
- [sign](BigDecimal.md#sign)
- [sin](BigDecimal.md#sin-1)
- [sinh](BigDecimal.md#sinh-1)
- [sqrt](BigDecimal.md#sqrt-1)
- [sub](BigDecimal.md#sub-1)
- [sum](BigDecimal.md#sum)
- [tan](BigDecimal.md#tan-1)
- [tanh](BigDecimal.md#tanh-1)
- [trunc](BigDecimal.md#trunc-1)

## Constructors

### constructor

• **new BigDecimal**(`n`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).constructor

## Properties

### d

• `Readonly` **d**: `number`[]

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).d

___

### e

• `Readonly` **e**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).e

___

### s

• `Readonly` **s**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).s

___

### Decimal

▪ `Static` `Optional` `Readonly` **Decimal**: typeof `Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).Decimal

___

### EUCLID

▪ `Static` `Readonly` **EUCLID**: ``9``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).EUCLID

___

### ROUND\_CEIL

▪ `Static` `Readonly` **ROUND\_CEIL**: ``2``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_CEIL

___

### ROUND\_DOWN

▪ `Static` `Readonly` **ROUND\_DOWN**: ``1``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_DOWN

___

### ROUND\_FLOOR

▪ `Static` `Readonly` **ROUND\_FLOOR**: ``3``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_FLOOR

___

### ROUND\_HALF\_CEIL

▪ `Static` `Readonly` **ROUND\_HALF\_CEIL**: ``7``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_HALF\_CEIL

___

### ROUND\_HALF\_DOWN

▪ `Static` `Readonly` **ROUND\_HALF\_DOWN**: ``5``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_HALF\_DOWN

___

### ROUND\_HALF\_EVEN

▪ `Static` `Readonly` **ROUND\_HALF\_EVEN**: ``6``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_HALF\_EVEN

___

### ROUND\_HALF\_FLOOR

▪ `Static` `Readonly` **ROUND\_HALF\_FLOOR**: ``8``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_HALF\_FLOOR

___

### ROUND\_HALF\_UP

▪ `Static` `Readonly` **ROUND\_HALF\_UP**: ``4``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_HALF\_UP

___

### ROUND\_UP

▪ `Static` `Readonly` **ROUND\_UP**: ``0``

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ROUND\_UP

___

### crypto

▪ `Static` `Readonly` **crypto**: `boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).crypto

___

### default

▪ `Static` `Optional` `Readonly` **default**: typeof `Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).default

___

### maxE

▪ `Static` `Readonly` **maxE**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).maxE

___

### minE

▪ `Static` `Readonly` **minE**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).minE

___

### modulo

▪ `Static` `Readonly` **modulo**: `Modulo`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).modulo

___

### precision

▪ `Static` `Readonly` **precision**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).precision

___

### rounding

▪ `Static` `Readonly` **rounding**: `Rounding`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).rounding

___

### toExpNeg

▪ `Static` `Readonly` **toExpNeg**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toExpNeg

___

### toExpPos

▪ `Static` `Readonly` **toExpPos**: `number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toExpPos

## Methods

### abs

▸ **abs**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).abs

___

### absoluteValue

▸ **absoluteValue**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).absoluteValue

___

### acos

▸ **acos**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).acos

___

### acosh

▸ **acosh**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).acosh

___

### add

▸ **add**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).add

___

### asin

▸ **asin**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).asin

___

### asinh

▸ **asinh**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).asinh

___

### atan

▸ **atan**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).atan

___

### atanh

▸ **atanh**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).atanh

___

### cbrt

▸ **cbrt**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cbrt

___

### ceil

▸ **ceil**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ceil

___

### clamp

▸ **clamp**(`min`, `max`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `Value` |
| `max` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).clamp

___

### clampedTo

▸ **clampedTo**(`min`, `max`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `Value` |
| `max` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).clampedTo

___

### cmp

▸ **cmp**(`n`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cmp

___

### comparedTo

▸ **comparedTo**(`n`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).comparedTo

___

### cos

▸ **cos**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cos

___

### cosh

▸ **cosh**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cosh

___

### cosine

▸ **cosine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cosine

___

### cubeRoot

▸ **cubeRoot**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cubeRoot

___

### decimalPlaces

▸ **decimalPlaces**(): `number`

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).decimalPlaces

___

### div

▸ **div**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).div

___

### divToInt

▸ **divToInt**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).divToInt

___

### dividedBy

▸ **dividedBy**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).dividedBy

___

### dividedToIntegerBy

▸ **dividedToIntegerBy**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).dividedToIntegerBy

___

### dp

▸ **dp**(): `number`

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).dp

___

### eq

▸ **eq**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).eq

___

### equals

▸ **equals**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).equals

___

### exp

▸ **exp**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).exp

___

### floor

▸ **floor**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).floor

___

### greaterThan

▸ **greaterThan**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).greaterThan

___

### greaterThanOrEqualTo

▸ **greaterThanOrEqualTo**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).greaterThanOrEqualTo

___

### gt

▸ **gt**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).gt

___

### gte

▸ **gte**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).gte

___

### hyperbolicCosine

▸ **hyperbolicCosine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).hyperbolicCosine

___

### hyperbolicSine

▸ **hyperbolicSine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).hyperbolicSine

___

### hyperbolicTangent

▸ **hyperbolicTangent**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).hyperbolicTangent

___

### inverseCosine

▸ **inverseCosine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).inverseCosine

___

### inverseHyperbolicCosine

▸ **inverseHyperbolicCosine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).inverseHyperbolicCosine

___

### inverseHyperbolicSine

▸ **inverseHyperbolicSine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).inverseHyperbolicSine

___

### inverseHyperbolicTangent

▸ **inverseHyperbolicTangent**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).inverseHyperbolicTangent

___

### inverseSine

▸ **inverseSine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).inverseSine

___

### inverseTangent

▸ **inverseTangent**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).inverseTangent

___

### isFinite

▸ **isFinite**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isFinite

___

### isInt

▸ **isInt**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isInt

___

### isInteger

▸ **isInteger**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isInteger

___

### isNaN

▸ **isNaN**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isNaN

___

### isNeg

▸ **isNeg**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isNeg

___

### isNegative

▸ **isNegative**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isNegative

___

### isPos

▸ **isPos**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isPos

___

### isPositive

▸ **isPositive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isPositive

___

### isZero

▸ **isZero**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isZero

___

### lessThan

▸ **lessThan**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).lessThan

___

### lessThanOrEqualTo

▸ **lessThanOrEqualTo**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).lessThanOrEqualTo

___

### ln

▸ **ln**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ln

___

### log

▸ **log**(`n?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n?` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).log

___

### logarithm

▸ **logarithm**(`n?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n?` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).logarithm

___

### lt

▸ **lt**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).lt

___

### lte

▸ **lte**(`n`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`boolean`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).lte

___

### minus

▸ **minus**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).minus

___

### mod

▸ **mod**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).mod

___

### modulo

▸ **modulo**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).modulo

___

### mul

▸ **mul**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).mul

___

### naturalExponential

▸ **naturalExponential**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).naturalExponential

___

### naturalLogarithm

▸ **naturalLogarithm**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).naturalLogarithm

___

### neg

▸ **neg**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).neg

___

### negated

▸ **negated**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).negated

___

### plus

▸ **plus**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).plus

___

### pow

▸ **pow**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).pow

___

### precision

▸ **precision**(`includeZeros?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `includeZeros?` | `boolean` |

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).precision

___

### round

▸ **round**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).round

___

### sd

▸ **sd**(`includeZeros?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `includeZeros?` | `boolean` |

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sd

___

### sin

▸ **sin**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sin

___

### sine

▸ **sine**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sine

___

### sinh

▸ **sinh**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sinh

___

### sqrt

▸ **sqrt**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sqrt

___

### squareRoot

▸ **squareRoot**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).squareRoot

___

### sub

▸ **sub**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sub

___

### tan

▸ **tan**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).tan

___

### tangent

▸ **tangent**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).tangent

___

### tanh

▸ **tanh**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).tanh

___

### times

▸ **times**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).times

___

### toBinary

▸ **toBinary**(`significantDigits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toBinary

▸ **toBinary**(`significantDigits`, `rounding`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toBinary

___

### toDP

▸ **toDP**(`decimalPlaces?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces?` | `number` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toDP

▸ **toDP**(`decimalPlaces`, `rounding`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces` | `number` |
| `rounding` | `Rounding` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toDP

___

### toDecimalPlaces

▸ **toDecimalPlaces**(`decimalPlaces?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces?` | `number` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toDecimalPlaces

▸ **toDecimalPlaces**(`decimalPlaces`, `rounding`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces` | `number` |
| `rounding` | `Rounding` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toDecimalPlaces

___

### toExponential

▸ **toExponential**(`decimalPlaces?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toExponential

▸ **toExponential**(`decimalPlaces`, `rounding`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces` | `number` |
| `rounding` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toExponential

___

### toFixed

▸ **toFixed**(`decimalPlaces?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toFixed

▸ **toFixed**(`decimalPlaces`, `rounding`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces` | `number` |
| `rounding` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toFixed

___

### toFraction

▸ **toFraction**(`max_denominator?`): `Decimal`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `max_denominator?` | `Value` |

#### Returns

`Decimal`[]

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toFraction

___

### toHex

▸ **toHex**(`significantDigits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toHex

▸ **toHex**(`significantDigits`, `rounding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding?` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toHex

___

### toHexadecimal

▸ **toHexadecimal**(`significantDigits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toHexadecimal

▸ **toHexadecimal**(`significantDigits`, `rounding`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toHexadecimal

___

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toJSON

___

### toNearest

▸ **toNearest**(`n`, `rounding?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |
| `rounding?` | `Rounding` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toNearest

___

### toNumber

▸ **toNumber**(): `number`

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toNumber

___

### toOctal

▸ **toOctal**(`significantDigits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toOctal

▸ **toOctal**(`significantDigits`, `rounding`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toOctal

___

### toPower

▸ **toPower**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toPower

___

### toPrecision

▸ **toPrecision**(`significantDigits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toPrecision

▸ **toPrecision**(`significantDigits`, `rounding`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding` | `Rounding` |

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toPrecision

___

### toSD

▸ **toSD**(`significantDigits?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toSD

▸ **toSD**(`significantDigits`, `rounding`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding` | `Rounding` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toSD

___

### toSignificantDigits

▸ **toSignificantDigits**(`significantDigits?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toSignificantDigits

▸ **toSignificantDigits**(`significantDigits`, `rounding`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits` | `number` |
| `rounding` | `Rounding` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toSignificantDigits

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).toString

___

### trunc

▸ **trunc**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).trunc

___

### truncated

▸ **truncated**(): `Decimal`

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).truncated

___

### valueOf

▸ **valueOf**(): `string`

#### Returns

`string`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).valueOf

___

### abs

▸ `Static` **abs**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).abs

___

### acos

▸ `Static` **acos**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).acos

___

### acosh

▸ `Static` **acosh**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).acosh

___

### add

▸ `Static` **add**(`x`, `y`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Value` |
| `y` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).add

___

### asin

▸ `Static` **asin**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).asin

___

### asinh

▸ `Static` **asinh**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).asinh

___

### atan

▸ `Static` **atan**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).atan

___

### atan2

▸ `Static` **atan2**(`y`, `x`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `Value` |
| `x` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).atan2

___

### atanh

▸ `Static` **atanh**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).atanh

___

### cbrt

▸ `Static` **cbrt**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cbrt

___

### ceil

▸ `Static` **ceil**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ceil

___

### clamp

▸ `Static` **clamp**(`n`, `min`, `max`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |
| `min` | `Value` |
| `max` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).clamp

___

### clone

▸ `Static` **clone**(`object?`): typeof `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object?` | `Config` |

#### Returns

typeof `Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).clone

___

### config

▸ `Static` **config**(`object`): typeof `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Config` |

#### Returns

typeof `Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).config

___

### cos

▸ `Static` **cos**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cos

___

### cosh

▸ `Static` **cosh**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).cosh

___

### div

▸ `Static` **div**(`x`, `y`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Value` |
| `y` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).div

___

### exp

▸ `Static` **exp**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).exp

___

### floor

▸ `Static` **floor**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).floor

___

### from

▸ `Static` **from**(`value`): [`BigDecimal`](BigDecimal.md)

Syntactic sugar over new BigDecimal

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Value` |

#### Returns

[`BigDecimal`](BigDecimal.md)

___

### hypot

▸ `Static` **hypot**(`...n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...n` | `Value`[] |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).hypot

___

### isDecimal

▸ `Static` **isDecimal**(`object`): object is Decimal

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

object is Decimal

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).isDecimal

___

### ln

▸ `Static` **ln**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).ln

___

### log

▸ `Static` **log**(`n`, `base?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |
| `base?` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).log

___

### log10

▸ `Static` **log10**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).log10

___

### log2

▸ `Static` **log2**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).log2

___

### max

▸ `Static` **max**(`...n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...n` | `Value`[] |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).max

___

### mean

▸ `Static` **mean**(`values`): [`BigDecimal`](BigDecimal.md)

Computes the mean of the given values

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | [`BigDecimal`](BigDecimal.md)[] |

#### Returns

[`BigDecimal`](BigDecimal.md)

___

### min

▸ `Static` **min**(`...n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...n` | `Value`[] |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).min

___

### mod

▸ `Static` **mod**(`x`, `y`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Value` |
| `y` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).mod

___

### mul

▸ `Static` **mul**(`x`, `y`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Value` |
| `y` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).mul

___

### noConflict

▸ `Static` **noConflict**(): typeof `Decimal`

#### Returns

typeof `Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).noConflict

___

### pow

▸ `Static` **pow**(`base`, `exponent`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | `Value` |
| `exponent` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).pow

___

### random

▸ `Static` **random**(`significantDigits?`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).random

___

### rescale

▸ `Static` **rescale**(`value`, `powerOfTen`): `Decimal`

Rescales the given value by the given power of 10

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BigDecimal`](BigDecimal.md) |
| `powerOfTen` | `number` |

#### Returns

`Decimal`

___

### round

▸ `Static` **round**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).round

___

### set

▸ `Static` **set**(`object`): typeof `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Config` |

#### Returns

typeof `Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).set

___

### sign

▸ `Static` **sign**(`n`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`number`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sign

___

### sin

▸ `Static` **sin**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sin

___

### sinh

▸ `Static` **sinh**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sinh

___

### sqrt

▸ `Static` **sqrt**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sqrt

___

### sub

▸ `Static` **sub**(`x`, `y`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Value` |
| `y` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sub

___

### sum

▸ `Static` **sum**(`...n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...n` | `Value`[] |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).sum

___

### tan

▸ `Static` **tan**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).tan

___

### tanh

▸ `Static` **tanh**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).tanh

___

### trunc

▸ `Static` **trunc**(`n`): `Decimal`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `Value` |

#### Returns

`Decimal`

#### Inherited from

DecimalJS.clone({
  precision: 32,
  toExpPos: 18, // use fixed-point notation up to 10^+18 (included)
  toExpNeg: -19, // use fixed-point notation up to 10^-18 (included)
  rounding: DecimalJS.ROUND\_HALF\_CEIL,
}).trunc
