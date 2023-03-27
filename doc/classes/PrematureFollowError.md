# Class: PrematureFollowError

## Hierarchy

- `Error`

  ↳ **`PrematureFollowError`**

## Table of contents

### Constructors

- [constructor](PrematureFollowError.md#constructor)

### Properties

- [cause](PrematureFollowError.md#cause)
- [message](PrematureFollowError.md#message)
- [name](PrematureFollowError.md#name)
- [stack](PrematureFollowError.md#stack)
- [prepareStackTrace](PrematureFollowError.md#preparestacktrace)
- [stackTraceLimit](PrematureFollowError.md#stacktracelimit)

### Methods

- [captureStackTrace](PrematureFollowError.md#capturestacktrace)

## Constructors

### constructor

• **new PrematureFollowError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

• **new PrematureFollowError**(`message?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `options?` | `ErrorOptions` |

#### Inherited from

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

• **name**: ``"PrematureFollowError"``

#### Overrides

Error.name

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
