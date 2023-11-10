/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace Types {
  export type PublicationActionParamsStruct = {
    publicationActedProfileId: PromiseOrValue<BigNumberish>;
    publicationActedId: PromiseOrValue<BigNumberish>;
    actorProfileId: PromiseOrValue<BigNumberish>;
    referrerProfileIds: PromiseOrValue<BigNumberish>[];
    referrerPubIds: PromiseOrValue<BigNumberish>[];
    actionModuleAddress: PromiseOrValue<string>;
    actionModuleData: PromiseOrValue<BytesLike>;
  };

  export type PublicationActionParamsStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber[],
    BigNumber[],
    string,
    string
  ] & {
    publicationActedProfileId: BigNumber;
    publicationActedId: BigNumber;
    actorProfileId: BigNumber;
    referrerProfileIds: BigNumber[];
    referrerPubIds: BigNumber[];
    actionModuleAddress: string;
    actionModuleData: string;
  };

  export type EIP712SignatureStruct = {
    signer: PromiseOrValue<string>;
    v: PromiseOrValue<BigNumberish>;
    r: PromiseOrValue<BytesLike>;
    s: PromiseOrValue<BytesLike>;
    deadline: PromiseOrValue<BigNumberish>;
  };

  export type EIP712SignatureStructOutput = [
    string,
    number,
    string,
    string,
    BigNumber
  ] & { signer: string; v: number; r: string; s: string; deadline: BigNumber };
}

export interface PublicActProxyInterface extends utils.Interface {
  functions: {
    "incrementNonce(uint8)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "publicCollect((uint256,uint256,uint256,uint256[],uint256[],address,bytes))": FunctionFragment;
    "publicCollectWithSig((uint256,uint256,uint256,uint256[],uint256[],address,bytes),(address,uint8,bytes32,bytes32,uint256))": FunctionFragment;
    "publicFreeAct((uint256,uint256,uint256,uint256[],uint256[],address,bytes))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "incrementNonce"
      | "name"
      | "nonces"
      | "publicCollect"
      | "publicCollectWithSig"
      | "publicFreeAct"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "incrementNonce",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nonces",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "publicCollect",
    values: [Types.PublicationActionParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "publicCollectWithSig",
    values: [Types.PublicationActionParamsStruct, Types.EIP712SignatureStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "publicFreeAct",
    values: [Types.PublicationActionParamsStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "incrementNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publicCollect",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publicCollectWithSig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publicFreeAct",
    data: BytesLike
  ): Result;

  events: {};
}

export interface PublicActProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PublicActProxyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    incrementNonce(
      increment: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonces(
      signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    publicCollect(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    publicCollectWithSig(
      publicationActionParams: Types.PublicationActionParamsStruct,
      signature: Types.EIP712SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    publicFreeAct(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  incrementNonce(
    increment: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  nonces(
    signer: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  publicCollect(
    publicationActionParams: Types.PublicationActionParamsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  publicCollectWithSig(
    publicationActionParams: Types.PublicationActionParamsStruct,
    signature: Types.EIP712SignatureStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  publicFreeAct(
    publicationActionParams: Types.PublicationActionParamsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    incrementNonce(
      increment: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    nonces(
      signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    publicCollect(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    publicCollectWithSig(
      publicationActionParams: Types.PublicationActionParamsStruct,
      signature: Types.EIP712SignatureStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    publicFreeAct(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    incrementNonce(
      increment: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(
      signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    publicCollect(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    publicCollectWithSig(
      publicationActionParams: Types.PublicationActionParamsStruct,
      signature: Types.EIP712SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    publicFreeAct(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    incrementNonce(
      increment: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    publicCollect(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    publicCollectWithSig(
      publicationActionParams: Types.PublicationActionParamsStruct,
      signature: Types.EIP712SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    publicFreeAct(
      publicationActionParams: Types.PublicationActionParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
