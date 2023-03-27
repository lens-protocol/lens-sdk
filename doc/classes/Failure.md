# Class: Failure<T, E\>

A `Success<T, E>` represents a successful computation that returns a value of type `T`.

`T` in `Failure<T, E>` is the type of the value that would have been returned in case of success.
It's present only to allow type safety of the `isSuccess` method.

## Type parameters

| Name |
| :------ |
| `T` |
| `E` |

## Table of contents

### Constructors

- [constructor](Failure.md#constructor)

### Properties

- [error](Failure.md#error)

### Methods

- [isFailure](Failure.md#isfailure)
- [isSuccess](Failure.md#issuccess)
- [unwrap](Failure.md#unwrap)

## Constructors

### constructor

• **new Failure**<`T`, `E`\>(`error`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` |

## Properties

### error

• `Readonly` **error**: `E`

## Methods

### isFailure

▸ **isFailure**(): this is Failure<T, E\>

#### Returns

this is Failure<T, E\>

___

### isSuccess

▸ **isSuccess**(): this is Success<T, E\>

#### Returns

this is Success<T, E\>

___

### unwrap

▸ **unwrap**(): `never`

#### Returns

`never`
