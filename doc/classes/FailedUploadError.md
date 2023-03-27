# Class: FailedUploadError

## Hierarchy

- `CausedError`

  ↳ **`FailedUploadError`**

## Table of contents

### Constructors

- [constructor](FailedUploadError.md#constructor)

### Properties

- [cause](FailedUploadError.md#cause)
- [message](FailedUploadError.md#message)
- [name](FailedUploadError.md#name)
- [stack](FailedUploadError.md#stack)
- [prepareStackTrace](FailedUploadError.md#preparestacktrace)
- [stackTraceLimit](FailedUploadError.md#stacktracelimit)

### Methods

- [captureStackTrace](FailedUploadError.md#capturestacktrace)

## Constructors

### constructor

• **new FailedUploadError**(`message`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `options` | `Object` |
| `options.cause` | `Error` |

#### Inherited from

CausedError.constructor

## Properties

### cause

• `Optional` `Readonly` **cause**: `Error`

#### Inherited from

CausedError.cause

___

### message

• **message**: `string`

#### Inherited from

CausedError.message

___

### name

• **name**: ``"FailedUploadError"``

#### Overrides

CausedError.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

CausedError.stack

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

CausedError.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

CausedError.stackTraceLimit

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

CausedError.captureStackTrace
