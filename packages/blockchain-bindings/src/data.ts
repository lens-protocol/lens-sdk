import { defaultAbiCoder, ParamType } from '@ethersproject/abi';
import { Data, invariant } from '@lens-protocol/shared-kernel';

/**
 * Module data.
 */
export type ModuleData = Array<string | boolean | string[] | string[][]>;

/**
 * A module parameter.
 */
export type ModuleParam = {
  /**
   * The local name of the parameter (of null if unbound)
   */
  name: string;
  /**
   * The fully qualified type (e.g. "address", "tuple(address)", "uint256[3][]"
   */
  type: string;
  /**
   * Tuples ONLY
   */
  components?: ModuleParam[];
};

/**
 * Encode an array of values into a DataHexString according to the provided ABI.
 *
 * @param abi - array of types to encode
 * @param data - array of data to encode
 * @returns encoded calldata
 *
 * @example
 * ```ts
 * const encoded = encodeData(
 *   JSON.parse(module.metadata.processCalldataABI) as ModuleParam[],
 *   [ 'value1', 'value2' ]
 * );
 * ```
 */
export function encodeData(abi: ModuleParam[], data: ModuleData): Data {
  invariant(
    abi.length === data.length,
    'Please provide the same number of data items as required by the contract method',
  );

  const types = abi.map((param, index) => {
    const dataItem = data[index];

    invariant(dataItem !== undefined, 'Please provide a value for each data item');

    return ParamType.fromObject({
      name: param.name,
      type: param.type,
      components: param.components,
      arrayLength: Array.isArray(dataItem) ? dataItem.length : undefined,
    });
  });

  return defaultAbiCoder.encode(types, data) as Data;
}

/**
 * Decode a DataHexString into an array of values according to the provided ABI.
 *
 * @param abi - array of types to decode
 * @param calldata - data to decode
 * @returns decoded data
 *
 * @example
 * ```ts
 * const decoded = decodeData(
 *   JSON.parse(module.metadata.initializeResultDataABI) as ModuleParam[],
 *   openActionSettings.initializeResultData
 * );
 * ```
 */
export function decodeData(abi: ModuleParam[], calldata: string): ModuleData {
  const types = abi.map((param) => {
    return ParamType.fromObject({
      name: param.name,
      type: param.type,
      components: param.components,
    });
  });

  return defaultAbiCoder.decode(types, calldata) as ModuleData;
}
