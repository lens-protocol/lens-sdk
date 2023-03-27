# Class: InvariantError

An error that occurs when a task violates a logical condition that is assumed to be true at all times.

## Hierarchy

- `Error`

  ↳ **`InvariantError`**

## Table of contents

### Constructors

- [constructor](InvariantError.md#constructor)

### Properties

- [cause](InvariantError.md#cause)
- [message](InvariantError.md#message)
- [name](InvariantError.md#name)
- [stack](InvariantError.md#stack)
- [prepareStackTrace](InvariantError.md#preparestacktrace)
- [stackTraceLimit](InvariantError.md#stacktracelimit)

### Methods

- [captureStackTrace](InvariantError.md#capturestacktrace)

## Constructors

### constructor

• **new InvariantError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

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

• **name**: `string`

#### Inherited from

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
