# Module: React Hooks Web

## Common Enumerations

- [ChainType](../enums/React_Hooks_Web.ChainType.md)

## Other Enumerations

- [DecryptFailReason](../enums/React_Hooks_Web.DecryptFailReason.md)
- [LogoutReason](../enums/React_Hooks_Web.LogoutReason.md)
- [NotificationTypes](../enums/React_Hooks_Web.NotificationTypes.md)
- [PublicationContentWarning](../enums/React_Hooks_Web.PublicationContentWarning.md)
- [PublicationMainFocus](../enums/React_Hooks_Web.PublicationMainFocus.md)
- [PublicationSortCriteria](../enums/React_Hooks_Web.PublicationSortCriteria.md)
- [PublicationTypes](../enums/React_Hooks_Web.PublicationTypes.md)

## Common Classes

- [Amount](../classes/React_Hooks_Web.Amount.md)
- [BigDecimal](../classes/React_Hooks_Web.BigDecimal.md)
- [Erc20](../classes/React_Hooks_Web.Erc20.md)
- [Ether](../classes/React_Hooks_Web.Ether.md)
- [Fiat](../classes/React_Hooks_Web.Fiat.md)
- [Matic](../classes/React_Hooks_Web.Matic.md)

## Other Classes

- [FailedTransactionError](../classes/React_Hooks_Web.FailedTransactionError.md)
- [Failure](../classes/React_Hooks_Web.Failure.md)
- [InvariantError](../classes/React_Hooks_Web.InvariantError.md)
- [Success](../classes/React_Hooks_Web.Success.md)

## Encryption Interfaces

- [ICipher](../interfaces/React_Hooks_Web.ICipher.md)
- [IEncryptionProvider](../interfaces/React_Hooks_Web.IEncryptionProvider.md)

## General Configuration Interfaces

- [IBindings](../interfaces/React_Hooks_Web.IBindings.md)

## Other Interfaces

- [IEquatableError](../interfaces/React_Hooks_Web.IEquatableError.md)
- [ILogger](../interfaces/React_Hooks_Web.ILogger.md)

## Common Type Aliases

- [AmountValue](React_Hooks_Web.md#amountvalue)
- [Asset](React_Hooks_Web.md#asset)
- [CryptoAmount](React_Hooks_Web.md#cryptoamount)
- [CryptoAsset](React_Hooks_Web.md#cryptoasset)
- [CryptoNativeAmount](React_Hooks_Web.md#cryptonativeamount)
- [CryptoNativeAsset](React_Hooks_Web.md#cryptonativeasset)
- [Erc20Info](React_Hooks_Web.md#erc20info)
- [FiatAmount](React_Hooks_Web.md#fiatamount)

## Encryption Type Aliases

- [AuthenticationConfig](React_Hooks_Web.md#authenticationconfig)

## General Configuration Type Aliases

- [EnvironmentConfig](React_Hooks_Web.md#environmentconfig)
- [LensConfig](React_Hooks_Web.md#lensconfig)
- [LensProviderProps](React_Hooks_Web.md#lensproviderprops)

## Other Type Aliases

- [AppId](React_Hooks_Web.md#appid)
- [Brand](React_Hooks_Web.md#brand)
- [Cast](React_Hooks_Web.md#cast)
- [ChainConfig](React_Hooks_Web.md#chainconfig)
- [ChainConfigRegistry](React_Hooks_Web.md#chainconfigregistry)
- [DistributiveOmit](React_Hooks_Web.md#distributiveomit)
- [ErrorHandler](React_Hooks_Web.md#errorhandler)
- [EthereumAddress](React_Hooks_Web.md#ethereumaddress)
- [LogoutData](React_Hooks_Web.md#logoutdata)
- [Narrow](React_Hooks_Web.md#narrow)
- [Overwrite](React_Hooks_Web.md#overwrite)
- [Prettify](React_Hooks_Web.md#prettify)
- [Primitive](React_Hooks_Web.md#primitive)
- [ProfileHandleResolver](React_Hooks_Web.md#profilehandleresolver)
- [PromiseResult](React_Hooks_Web.md#promiseresult)
- [Result](React_Hooks_Web.md#result)
- [TwoAtLeastArray](React_Hooks_Web.md#twoatleastarray)
- [Url](React_Hooks_Web.md#url)

## Transaction Configuration Type Aliases

- [TransactionObserverTimings](React_Hooks_Web.md#transactionobservertimings)

## Wallet Type Aliases

- [LogoutHandler](React_Hooks_Web.md#logouthandler)

## Common Variables

- [Denomination](React_Hooks_Web.md#denomination)

## General Configuration Variables

- [production](React_Hooks_Web.md#production)
- [staging](React_Hooks_Web.md#staging)

## Common Functions

- [erc20](React_Hooks_Web.md#erc20)
- [ether](React_Hooks_Web.md#ether)
- [matic](React_Hooks_Web.md#matic)
- [usd](React_Hooks_Web.md#usd)

## General Configuration Functions

- [LensProvider](React_Hooks_Web.md#lensprovider)

## Common Type Aliases

### AmountValue

Ƭ **AmountValue**: [`BigDecimal`](../classes/React_Hooks_Web.BigDecimal.md) \| `number` \| `string`

A type alias for a value that can be used to construct an [Amount](../classes/React_Hooks_Web.Amount.md)

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:21](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L21)

___

### Asset

Ƭ **Asset**: [`Fiat`](../classes/React_Hooks_Web.Fiat.md) \| [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Erc20`](../classes/React_Hooks_Web.Erc20.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

Asset is a convenience union of value objects representing currency or token.

Asset instances are immutable and can be compared using reference equality (`===`).

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:206](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L206)

___

### CryptoAmount

Ƭ **CryptoAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`CryptoAsset`](React_Hooks_Web.md#cryptoasset)\>

A convenience type to specify a crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:308](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L308)

___

### CryptoAsset

Ƭ **CryptoAsset**: [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Erc20`](../classes/React_Hooks_Web.Erc20.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

CryptoAsset is a convenience union representing currencies that are blockchain tokens.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:225](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L225)

___

### CryptoNativeAmount

Ƭ **CryptoNativeAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`CryptoNativeAsset`](React_Hooks_Web.md#cryptonativeasset)\>

A convenience type to specify a native crypto amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:315](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L315)

___

### CryptoNativeAsset

Ƭ **CryptoNativeAsset**: [`Ether`](../classes/React_Hooks_Web.Ether.md) \| [`Matic`](../classes/React_Hooks_Web.Matic.md)

CryptoAsset is a convenience union representing tokens that are native to the supported blockchains.

**`Remarks`**

The reason we make a distinction between CryptoAsset and [Asset](React_Hooks_Web.md#asset) is that CryptoAsset are
kind of "special" in that they are the only assets that do not have a canonical contract address
and they are used to pay for gas fees.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:218](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L218)

___

### Erc20Info

Ƭ **Erc20Info**: `Object`

Initialization object for [erc20](React_Hooks_Web.md#erc20) factory function

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainType` | [`ChainType`](../enums/React_Hooks_Web.ChainType.md) |
| `decimals` | `number` |
| `name` | `string` |
| `symbol` | `string` |

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:246](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L246)

___

### FiatAmount

Ƭ **FiatAmount**: [`Amount`](../classes/React_Hooks_Web.Amount.md)<[`Fiat`](../classes/React_Hooks_Web.Fiat.md)\>

A convenience type to specify a fiat amount value.

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:322](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L322)

___

## Encryption Type Aliases

### AuthenticationConfig

Ƭ **AuthenticationConfig**: `Object`

The LIT Protocol authentication configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `statement?` | `string` |
| `uri` | `string` |

#### Defined in

[packages/gated-content/src/GatedClient.ts:32](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/GatedClient.ts#L32)

___

## General Configuration Type Aliases

### EnvironmentConfig

Ƭ **EnvironmentConfig**: `Object`

The environment configuration type

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backend` | [`Url`](React_Hooks_Web.md#url) |
| `chains` | [`ChainConfigRegistry`](React_Hooks_Web.md#chainconfigregistry) |
| `handleResolver` | [`ProfileHandleResolver`](React_Hooks_Web.md#profilehandleresolver) |
| `timings` | [`TransactionObserverTimings`](React_Hooks_Web.md#transactionobservertimings) |

#### Defined in

[packages/react/src/environments.ts:18](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/environments.ts#L18)

___

### LensConfig

Ƭ **LensConfig**: `Object`

`<LensProvider>` configuration

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId?` | [`AppId`](React_Hooks_Web.md#appid) | The `appId` identifies post and comment created from the SDK The `appId`, if provided, MUST be included in the `sources` array. **`Default Value`** not set **`See`** [appId](React_Hooks_Web.md#appid) helper |
| `bindings` | [`IBindings`](../interfaces/React_Hooks_Web.IBindings.md) | Provides integration with the ethers.js Signer and Provider |
| `environment` | [`EnvironmentConfig`](React_Hooks_Web.md#environmentconfig) | The environment to use. See [production](React_Hooks_Web.md#production) and [staging](React_Hooks_Web.md#staging). |
| `logger?` | [`ILogger`](../interfaces/React_Hooks_Web.ILogger.md) | The logger interface to use when something worth logging happens **`Default Value`** `ConsoleLogger`, an internal implementation of [ILogger](../interfaces/React_Hooks_Web.ILogger.md) that logs to the console |
| `sources?` | [`AppId`](React_Hooks_Web.md#appid)[] | The `sources` determines the sources of posts and comments that will be fetched It also determines some Profile related statistics, such as the number of posts and comments **`Default Value`** any sources, not restricted. |

#### Defined in

[packages/react-web/src/LensProvider.tsx:21](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react-web/src/LensProvider.tsx#L21)

___

### LensProviderProps

Ƭ **LensProviderProps**: `PropsWithChildren`<{ `config`: [`LensConfig`](React_Hooks_Web.md#lensconfig) ; `onError?`: [`ErrorHandler`](React_Hooks_Web.md#errorhandler)<[`FailedTransactionError`](../classes/React_Hooks_Web.FailedTransactionError.md)\> ; `onLogout?`: [`LogoutHandler`](React_Hooks_Web.md#logouthandler)  }\>

<LensProvider> props

#### Defined in

[packages/react-web/src/LensProvider.tsx:61](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react-web/src/LensProvider.tsx#L61)

___

## Other Type Aliases

### AppId

Ƭ **AppId**: [`Brand`](React_Hooks_Web.md#brand)<`string`, ``"AppId"``\>

Unique identifier for an app

#### Defined in

[packages/domain/src/entities/AppId.ts:6](https://github.com/lens-protocol/lens-sdk/blob/main/packages/domain/src/entities/AppId.ts#L6)

___

### Brand

Ƭ **Brand**<`T`, `TBrand`\>: `T` & { `[brand]`: `TBrand`  }

Branding function

#### Type parameters

| Name |
| :------ |
| `T` |
| `TBrand` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:126](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L126)

___

### Cast

Ƭ **Cast**<`A`, `B`\>: `A` extends `B` ? `A` : `B`

Ask TS to re-check that A1 extends A2. And if it fails, A2 will be enforced anyway.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:54](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L54)

___

### ChainConfig

Ƭ **ChainConfig**: `Object`

A chain configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockExplorer` | `string` |
| `chainId` | `number` |
| `name` | `string` |
| `nativeCurrency` | [`CryptoNativeAsset`](React_Hooks_Web.md#cryptonativeasset) |
| `rpcUrl` | `string` |

#### Defined in

[packages/react/src/chains.ts:6](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/chains.ts#L6)

___

### ChainConfigRegistry

Ƭ **ChainConfigRegistry**: `Record`<[`ChainType`](../enums/React_Hooks_Web.ChainType.md), [`ChainConfig`](React_Hooks_Web.md#chainconfig)\>

A registry of chain configurations

#### Defined in

[packages/react/src/chains.ts:49](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/chains.ts#L49)

___

### DistributiveOmit

Ƭ **DistributiveOmit**<`T`, `K`\>: `T` extends `any` ? `Omit`<`T`, `K`\> : `never`

Omits properties from an union type, preserving the union.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `any` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:83](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L83)

___

### ErrorHandler

Ƭ **ErrorHandler**<`T`\>: (`error`: `T`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Error` |

#### Type declaration

▸ (`error`): `void`

A function that handles an error.

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `T` |

##### Returns

`void`

#### Defined in

[packages/react/src/ErrorHandler.ts:4](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/ErrorHandler.ts#L4)

___

### EthereumAddress

Ƭ **EthereumAddress**: `string`

An EVM address

#### Defined in

[packages/shared-kernel/src/crypto/types.ts:5](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/types.ts#L5)

___

### LogoutData

Ƭ **LogoutData**: `Object`

Data returned when logging out

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `logoutReason` | [`LogoutReason`](../enums/React_Hooks_Web.LogoutReason.md) | The reason for logging out |

#### Defined in

[packages/domain/src/use-cases/wallets/ILogoutPresenter.ts:15](https://github.com/lens-protocol/lens-sdk/blob/main/packages/domain/src/use-cases/wallets/ILogoutPresenter.ts#L15)

___

### Narrow

Ƭ **Narrow**<`A`\>: [`Cast`](React_Hooks_Web.md#cast)<`A`, [] \| `A` extends [`Primitive`](React_Hooks_Web.md#primitive) ? `A` : `never` \| { [K in keyof A]: Narrow<A[K]\> }\>

Prevent type widening on generic parameters

#### Type parameters

| Name |
| :------ |
| `A` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:59](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L59)

___

### Overwrite

Ƭ **Overwrite**<`T1`, `T2`\>: [`DistributiveOmit`](React_Hooks_Web.md#distributiveomit)<`T1`, keyof `T2`\> & `T2`

Overwrites properties from T1 with one from T2

**`Example`**

```ts
Overwrite<{ foo: boolean, bar: string }, { foo: number }> // { foo: number, bar: string }
```

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:31](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L31)

___

### Prettify

Ƭ **Prettify**<`T`\>: { [K in keyof T]: T[K] } & {}

Beautify the  readout of all of the members of that intersection.

As seen on tv: https://twitter.com/mattpocockuk/status/1622730173446557697

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:116](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L116)

___

### Primitive

Ƭ **Primitive**: `string` \| `number` \| `boolean` \| `bigint` \| `symbol` \| `undefined` \| ``null``

Primitive types

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:77](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L77)

___

### ProfileHandleResolver

Ƭ **ProfileHandleResolver**: (`handle`: `string`) => `string`

#### Type declaration

▸ (`handle`): `string`

A function that resolves a profile handle to a fully qualified profile handle

##### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `string` |

##### Returns

`string`

#### Defined in

[packages/react/src/environments.ts:11](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/environments.ts#L11)

___

### PromiseResult

Ƭ **PromiseResult**<`T`, `E`\>: `Promise`<[`Result`](React_Hooks_Web.md#result)<`T`, `E`\>\>

A `PromiseResult` is a convenience type alias that represents either a [Result](React_Hooks_Web.md#result) in the context of asynchronous tasks.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`IEquatableError`](../interfaces/React_Hooks_Web.IEquatableError.md) |

#### Defined in

[packages/shared-kernel/src/Result.ts:154](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/Result.ts#L154)

___

### Result

Ƭ **Result**<`T`, `E`\>: [`Success`](../classes/React_Hooks_Web.Success.md)<`T`, `E`\> \| [`Failure`](../classes/React_Hooks_Web.Failure.md)<`T`, `E`\>

A `Result` type represents either `Success` or failure `Failure`.

**TL;DR**

`Result` is a minimalist implementation of a value that can be a "success" or a "failure".
It borrows from what done in other modern languages (i.e. Rust, Kotlin, Swift, etc.).

The Lens SDK adopts this pattern in order to:
- be explicit about the known failure scenarios of a task,
- provide a way for consumers to perform exhaustive error handling,
- makes control flow easier to reason about.

**`Remarks`**

You might be familiar with the `Either` type from functional programming. The `Result` type
could be seen as a more specific version of `Either` where the left side is reserved for
success scenarios and the right side is reserved for known failure scenarios.

Think of failure scenarios as alternative outcomes of a given task that although not the "happy path",
are still legitimate results for the task within the boundary of a correct usage of the SDK.

In promoting exhaustive error handling, the Lens SDK makes it easier to evolve your code
when a new error case is added or a case is removed.
For example after a Lens SDK upgrade you can simply run the TS compiler to figure out where you
need to handle the new error cases, or even better, it guides you to remove obsolescent code
where an error case is no longer possible. This is virtually impossible with a `try/catch` approach.

Thrown exceptions are historically difficult to trace. They require implicit knowledge
of the implementation details of the code that might throw exceptions. This might go several
layers down and leads to tight coupling between modules.

The Lens SDK still throws exceptions where the error is not a "normal execution scenario".
These are considered real "exceptional circumstances" and not alternative outcomes and it's up to the consumer to `try/catch` them.

An example of errors that are thrown by the SDK is [InvariantError](../classes/React_Hooks_Web.InvariantError.md). They are often thrown as result of a misuse of the SDK.
By throwing them we want to fail fast so the consumer can fix the issue as soon as possible.
Specifically for `InvariantError`, there is no need to code defensively against these errors. Just rectify the coding issue and move on.

**`Example`**

Control flow

```ts
const result: Result<number, RangeError> = doSomething();

if (result.isFailure()) {
  // because of the `isFailure` check above, TS knows that `result` is a `Failure<number, RangeError>` here
  console.log(result.error); // result.error gets narrowed to `RangeError`

  return; // early return
}

// because of the `isFailure` check above and the early return, TS knows that `result` is a `Success<number, RangeError>` here
console.log(result.value); // result.value gets narrowed to `number`
```

**`Example`**

Exhaustive error handling

Given a result type like the following:

```ts
const result: Result<number, PendingSigningError | WalletConnectionError> = doSomething();
```
You can use a function with a `switch` statement to perform exhaustive error handling:
```ts
function format(failure: Failure<number, PendingSigningError | WalletConnectionError>): string {
  switch (failure.error.name) {
    case 'PendingSigningError':
      return 'Please sign the transaction';
      break;
    case 'WalletConnectionError':
      return 'Please connect your wallet and try again';
      break;
  }
  // any code after the switch statement is unreachable
}
```
The example above assumes `allowUnreachableCode: false` in your `tsconfig.json`.

An even more robust way to perform exhaustive error handling with a `switch` is to use the `never` type: see [exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking).

**`See`**

 - https://wiki.c2.com/?AvoidExceptionsWheneverPossible
 - https://developer.apple.com/documentation/swift/result
 - https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/
 - https://the-guild.dev/blog/graphql-error-handling-with-fp#monads-to-the-rescue

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`IEquatableError`](../interfaces/React_Hooks_Web.IEquatableError.md) |

#### Defined in

[packages/shared-kernel/src/Result.ts:149](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/Result.ts#L149)

___

### TwoAtLeastArray

Ƭ **TwoAtLeastArray**<`T`\>: [`Overwrite`](React_Hooks_Web.md#overwrite)<[`T`, `T`, ...T[]], { `map`: <U\>(`callbackfn`: (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U`, `thisArg?`: `unknown`) => [`TwoAtLeastArray`](React_Hooks_Web.md#twoatleastarray)<`U`\>  }\>

Declares an array of at least two elements of the specified type.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/shared-kernel/src/ts-helpers/types.ts:101](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/ts-helpers/types.ts#L101)

___

### Url

Ƭ **Url**: `string`

A URL

#### Defined in

[packages/shared-kernel/src/crypto/types.ts:11](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/types.ts#L11)

___

## Transaction Configuration Type Aliases

### TransactionObserverTimings

Ƭ **TransactionObserverTimings**: `Object`

The transaction observer timings

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxIndexingWaitTime` | `number` |
| `maxMiningWaitTime` | `number` |
| `pollingInterval` | `number` |

#### Defined in

[packages/react/src/transactions/infrastructure/TransactionObserver.ts:29](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/transactions/infrastructure/TransactionObserver.ts#L29)

___

## Wallet Type Aliases

### LogoutHandler

Ƭ **LogoutHandler**: (`data`: [`LogoutData`](React_Hooks_Web.md#logoutdata)) => `void`

#### Type declaration

▸ (`data`): `void`

Handler for logging out

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LogoutData`](React_Hooks_Web.md#logoutdata) |

##### Returns

`void`

#### Defined in

[packages/react/src/wallet/adapters/LogoutPresenter.ts:11](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/wallet/adapters/LogoutPresenter.ts#L11)

## Common Variables

### Denomination

• `Const` **Denomination**: `Object`

A set of convenience helpers useful to specify amount values in common denominations.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gwei` | (`value`: [`AmountValue`](React_Hooks_Web.md#amountvalue)) => `Decimal` |
| `wei` | (`value`: [`AmountValue`](React_Hooks_Web.md#amountvalue)) => `Decimal` |

#### Defined in

[packages/shared-kernel/src/crypto/Amount.ts:28](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Amount.ts#L28)

___

## General Configuration Variables

### production

• `Const` **production**: [`EnvironmentConfig`](React_Hooks_Web.md#environmentconfig)

The production environment configuration

- Endpoint: https://api.lens.dev
- Chain IDs: 137 (Polygon), 1 (Ethereum)
- Profile handle suffix: `.lens`
- Environment specific timings

#### Defined in

[packages/react/src/environments.ts:35](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/environments.ts#L35)

___

### staging

• `Const` **staging**: [`EnvironmentConfig`](React_Hooks_Web.md#environmentconfig)

The staging environment configuration

- Endpoint: https://api-mumbai.lens.dev
- Chain IDs: 80001 (Mumbai), 5 (Goerli)
- Profile handle suffix: `.test`
- Environment specific timings

#### Defined in

[packages/react/src/environments.ts:59](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react/src/environments.ts#L59)

## Common Functions

### erc20

▸ **erc20**(`info`): [`Erc20`](../classes/React_Hooks_Web.Erc20.md)

Erc20 asset factory function.

Erc20 instances, like all [Asset](React_Hooks_Web.md#asset) instances, are immutable and can be compared using reference equality (`===`).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `info` | [`Erc20Info`](React_Hooks_Web.md#erc20info) | [details](React_Hooks_Web.md#erc20info) |

#### Returns

[`Erc20`](../classes/React_Hooks_Web.Erc20.md)

An Erc20 instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:263](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L263)

___

### ether

▸ **ether**(): [`Ether`](../classes/React_Hooks_Web.Ether.md)

Ether asset provider function.

There is only one Ether token, so this function returns the same instance every time.

#### Returns

[`Ether`](../classes/React_Hooks_Web.Ether.md)

The Ether instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:289](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L289)

___

### matic

▸ **matic**(): [`Matic`](../classes/React_Hooks_Web.Matic.md)

Matic asset provider function.

There is only one Matic token, so this function returns the same instance every time.

#### Returns

[`Matic`](../classes/React_Hooks_Web.Matic.md)

The Matic instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:276](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L276)

___

### usd

▸ **usd**(): [`Fiat`](../classes/React_Hooks_Web.Fiat.md)

A convenience function to create a Fiat asset for USD.

There is only one USD token, so this function returns the same instance every time.

#### Returns

[`Fiat`](../classes/React_Hooks_Web.Fiat.md)

The USD Fiat instance.

#### Defined in

[packages/shared-kernel/src/crypto/Asset.ts:302](https://github.com/lens-protocol/lens-sdk/blob/main/packages/shared-kernel/src/crypto/Asset.ts#L302)

___

## General Configuration Functions

### LensProvider

▸ **LensProvider**(`props`): `Element`

Given [LensConfig](React_Hooks_Web.md#lensconfig) it manages the lifecycle and internal state management of the Lens SDK

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`LensProviderProps`](React_Hooks_Web.md#lensproviderprops) | [LensProviderProps](React_Hooks_Web.md#lensproviderprops) |

#### Returns

`Element`

#### Defined in

[packages/react-web/src/LensProvider.tsx:82](https://github.com/lens-protocol/lens-sdk/blob/main/packages/react-web/src/LensProvider.tsx#L82)
