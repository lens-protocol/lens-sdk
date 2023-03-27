# Class: PrematureUnfollowError

## Hierarchy

- `Error`

  ↳ **`PrematureUnfollowError`**

## Table of contents

### Constructors

- [constructor](PrematureUnfollowError.md#constructor)

### Properties

- [cause](PrematureUnfollowError.md#cause)
- [message](PrematureUnfollowError.md#message)
- [name](PrematureUnfollowError.md#name)
- [stack](PrematureUnfollowError.md#stack)
- [prepareStackTrace](PrematureUnfollowError.md#preparestacktrace)
- [stackTraceLimit](PrematureUnfollowError.md#stacktracelimit)

### Methods

- [captureStackTrace](PrematureUnfollowError.md#capturestacktrace)

## Constructors

### constructor

• **new PrematureUnfollowError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

• **new PrematureUnfollowError**(`message?`, `options?`)

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

• **name**: ``"PrematureUnfollowError"``

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
