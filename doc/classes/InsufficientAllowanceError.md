# Class: InsufficientAllowanceError

## Hierarchy

- `Error`

  ↳ **`InsufficientAllowanceError`**

## Table of contents

### Constructors

- [constructor](InsufficientAllowanceError.md#constructor)

### Properties

- [cause](InsufficientAllowanceError.md#cause)
- [message](InsufficientAllowanceError.md#message)
- [name](InsufficientAllowanceError.md#name)
- [requestedAmount](InsufficientAllowanceError.md#requestedamount)
- [stack](InsufficientAllowanceError.md#stack)
- [prepareStackTrace](InsufficientAllowanceError.md#preparestacktrace)
- [stackTraceLimit](InsufficientAllowanceError.md#stacktracelimit)

### Methods

- [captureStackTrace](InsufficientAllowanceError.md#capturestacktrace)

## Constructors

### constructor

• **new InsufficientAllowanceError**(`requestedAmount`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestedAmount` | [`Amount`](Amount.md)<[`Erc20`](Erc20.md)\> |

#### Overrides

Error.constructor

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

___

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: ``"InsufficientAllowanceError"``

#### Overrides

Error.name

___

### requestedAmount

• `Readonly` **requestedAmount**: [`Amount`](Amount.md)<[`Erc20`](Erc20.md)\>

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace
