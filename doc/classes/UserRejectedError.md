# Class: UserRejectedError

## Hierarchy

- `Error`

  ↳ **`UserRejectedError`**

## Table of contents

### Constructors

- [constructor](UserRejectedError.md#constructor)

### Properties

- [cause](UserRejectedError.md#cause)
- [message](UserRejectedError.md#message)
- [name](UserRejectedError.md#name)
- [stack](UserRejectedError.md#stack)
- [prepareStackTrace](UserRejectedError.md#preparestacktrace)
- [stackTraceLimit](UserRejectedError.md#stacktracelimit)

### Methods

- [captureStackTrace](UserRejectedError.md#capturestacktrace)

## Constructors

### constructor

• **new UserRejectedError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

• **new UserRejectedError**(`message?`, `options?`)

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

• **message**: `string` = `'User rejected the request'`

#### Overrides

Error.message

___

### name

• **name**: ``"UserRejectedError"``

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
