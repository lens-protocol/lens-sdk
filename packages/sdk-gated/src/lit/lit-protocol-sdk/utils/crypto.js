import { getCrypto, getSubtleCrypto } from '../../utils';
import { log, throwError } from '../lib-js/utils';

/**
 * Hash the unified access control conditions using SHA-256 in a deterministic way.
 * @param {Object} unifiedAccessControlConditions - The unified access control conditions to hash.
 * @returns {Promise<ArrayBuffer>} A promise that resolves to an ArrayBuffer that contains the hash
 */
export async function hashUnifiedAccessControlConditions(unifiedAccessControlConditions) {
  const conds = unifiedAccessControlConditions.map((c) =>
    canonicalUnifiedAccessControlConditionFormatter(c)
  );
  const toHash = JSON.stringify(conds);
  log('Hashing unified access control conditions: ', toHash);
  const encoder = new TextEncoder();
  const data = encoder.encode(toHash);
  const subtle = getSubtleCrypto();
  return subtle.digest('SHA-256', data);
}

export function canonicalUnifiedAccessControlConditionFormatter(cond) {
  if (Array.isArray(cond)) {
    return cond.map((c) => canonicalUnifiedAccessControlConditionFormatter(c));
  }

  if ('operator' in cond) {
    return {
      operator: cond.operator,
    };
  }

  if ('returnValueTest' in cond) {
    if (cond.conditionType === 'evmBasic') {
      return canonicalAccessControlConditionFormatter(cond);
    } else if (cond.conditionType === 'evmContract') {
      return canonicalEVMContractConditionFormatter(cond);
    } else {
      throwError({
        message: `You passed an invalid access control condition that is missing or has a wrong "conditionType": ${JSON.stringify(
          cond
        )}`,
        name: 'InvalidAccessControlCondition',
        errorCode: 'invalid_access_control_condition',
      });
    }
  }

  throwError({
    message: `You passed an invalid access control condition: ${cond}`,
    name: 'InvalidAccessControlCondition',
    errorCode: 'invalid_access_control_condition',
  });
}

export function canonicalResourceIdFormatter(resId) {
  // need to return in the exact format below:

  return {
    baseUrl: resId.baseUrl,
    path: resId.path,
    orgId: resId.orgId,
    role: resId.role,
    extraData: resId.extraData,
  };
}

export async function hashResourceId(resourceId) {
  const resId = canonicalResourceIdFormatter(resourceId);
  const toHash = JSON.stringify(resId);
  const encoder = new TextEncoder();
  const data = encoder.encode(toHash);
  const subtle = getSubtleCrypto();
  return subtle.digest('SHA-256', data);
}

function canonicalAbiParams(params) {
  return params.map((param) => ({
    name: param.name,
    type: param.type,
  }));
}

export function canonicalEVMContractConditionFormatter(cond) {
  // need to return in the exact format below:
  /*
  pub struct JsonAccessControlCondition {
    pub contract_address: String,
    pub chain: String,
    pub standard_contract_type: String,
    pub method: String,
    pub parameters: Vec<String>,
    pub return_value_test: JsonReturnValueTest,
  }
  */

  if (Array.isArray(cond)) {
    return cond.map((c) => canonicalEVMContractConditionFormatter(c));
  }

  if ('operator' in cond) {
    return {
      operator: cond.operator,
    };
  }

  if ('returnValueTest' in cond) {
    /* abi needs to match:
      pub name: String,
    /// Function input.
    pub inputs: Vec<Param>,
    /// Function output.
    pub outputs: Vec<Param>,
    #[deprecated(note = "The constant attribute was removed in Solidity 0.5.0 and has been \
          replaced with stateMutability. If parsing a JSON AST created with \
          this version or later this value will always be false, which may be wrong.")]
    /// Constant function.
    #[cfg_attr(feature = "full-serde", serde(default))]
    pub constant: bool,
    /// Whether the function reads or modifies blockchain state
    #[cfg_attr(feature = "full-serde", serde(rename = "stateMutability", default))]
    pub state_mutability: StateMutability,
    */

    const { functionAbi, returnValueTest } = cond;

    const canonicalAbi = {
      name: functionAbi.name,
      inputs: canonicalAbiParams(functionAbi.inputs),
      outputs: canonicalAbiParams(functionAbi.outputs),
      constant: typeof functionAbi.constant === 'undefined' ? false : functionAbi.constant,
      stateMutability: functionAbi.stateMutability,
    };

    const canonicalReturnValueTest = {
      key: returnValueTest.key,
      comparator: returnValueTest.comparator,
      value: returnValueTest.value,
    };

    return {
      contractAddress: cond.contractAddress,
      functionName: cond.functionName,
      functionParams: cond.functionParams,
      functionAbi: canonicalAbi,
      chain: cond.chain,
      returnValueTest: canonicalReturnValueTest,
    };
  }

  throwError({
    message: `You passed an invalid access control condition: ${cond}`,
    name: 'InvalidAccessControlCondition',
    errorCode: 'invalid_access_control_condition',
  });
}

export function canonicalAccessControlConditionFormatter(cond) {
  // need to return in the exact format below:
  /*
  pub struct JsonAccessControlCondition {
    pub contract_address: String,
    pub chain: String,
    pub standard_contract_type: String,
    pub method: String,
    pub parameters: Vec<String>,
    pub return_value_test: JsonReturnValueTest,
  }
  */

  if (Array.isArray(cond)) {
    return cond.map((c) => canonicalAccessControlConditionFormatter(c));
  }

  if ('operator' in cond) {
    return {
      operator: cond.operator,
    };
  }

  if ('returnValueTest' in cond) {
    return {
      contractAddress: cond.contractAddress,
      chain: cond.chain,
      standardContractType: cond.standardContractType,
      method: cond.method,
      parameters: cond.parameters,
      returnValueTest: {
        comparator: cond.returnValueTest.comparator,
        value: cond.returnValueTest.value,
      },
    };
  }

  throwError({
    message: `You passed an invalid access control condition: ${cond}`,
    name: 'InvalidAccessControlCondition',
    errorCode: 'invalid_access_control_condition',
  });
}

export async function decryptWithSymmetricKey(encryptedBlob, symmKey) {
  const recoveredIv = await encryptedBlob.slice(0, 16).arrayBuffer();
  const encryptedZipArrayBuffer = await encryptedBlob.slice(16).arrayBuffer();
  const subtle = getSubtleCrypto();
  return subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: recoveredIv,
    },
    symmKey,
    encryptedZipArrayBuffer
  );
}

export async function encryptWithSymmetricKey(symmKey, data) {
  // encrypt the zip with symmetric key
  const iv = getCrypto().getRandomValues(new Uint8Array(16));

  const subtle = getSubtleCrypto();
  const encryptedZipData = await subtle.encrypt(
    {
      name: 'AES-CBC',
      iv,
    },
    symmKey,
    data
  );
  return new Blob([iv, new Uint8Array(encryptedZipData)], {
    type: 'application/octet-stream',
  });
}
