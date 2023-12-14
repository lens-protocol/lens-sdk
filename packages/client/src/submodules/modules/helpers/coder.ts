import { defaultAbiCoder, ParamType, Result } from '@ethersproject/abi';
import { invariant } from '@lens-protocol/shared-kernel';

export type ModuleParam = {
  name: string;
  type: string;
  components?: ModuleParam[];
};

/**
 * Encode data for a contract method call
 *
 * @param abi - array of types to encode
 * @param data - array of data to encode
 * @returns encoded calldata
 *
 * @example
 * ```ts
 * const calldata = encodeData(
 *   JSON.parse(result.metadata.processCalldataABI) as ModuleParam[],
 *   [ 'value1', 'value2' ]
 * );
 * ```
 */
export function encodeData(
  abi: ModuleParam[],
  data: (string | boolean | string[] | string[][])[],
): string {
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

  return defaultAbiCoder.encode(types, data);
}

/**
 *
 * @param abi - array of types to decode
 * @param calldata - data to decode
 * @returns decoded data
 *
 * @example
 * ```ts
 * const result = decodeData(
 *   JSON.parse(result.metadata.initializeResultDataABI) as ModuleParam[],
 *   openActionSettings.initializeResultData
 * );
 * ```
 */
export function decodeData(abi: ModuleParam[], calldata: string): Result {
  const types = abi.map((param) => {
    return ParamType.fromObject({
      name: param.name,
      type: param.type,
      components: param.components,
    });
  });

  return defaultAbiCoder.decode(types, calldata);
}
