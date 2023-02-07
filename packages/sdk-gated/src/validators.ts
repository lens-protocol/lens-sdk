import { Signer } from '@ethersproject/abstract-signer';
import { getAddress, isAddress } from '@ethersproject/address';
import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import {
  EnvironmentError,
  InvalidAccessCriteriaError,
  InvalidAddressError,
  ValidationError,
} from './error';
import { ContractType, ScalarOperator } from './graphql/types';
import { LensEnvironment } from './types';
import { chainIdToString } from './utils';

export const validateAddress = (address: string) => {
  if (!isAddress(address)) throw new InvalidAddressError(address);
  return getAddress(address);
};

export const validateAddressWithSigner = async (address: string, signer: Signer) => {
  const providedAddress = validateAddress(address);
  const signerAddress = await signer.getAddress();
  if (providedAddress !== signerAddress) {
    throw new InvalidAddressError(
      `Provided address ${providedAddress} different than address from signer ${signerAddress}`
    );
  }
  return providedAddress;
};

export const validateChainID = (chainID: number) => {
  chainIdToString(chainID);
  return chainID;
};

export const validateContractType = (contractType: string) => {
  if (contractType !== ContractType.Erc721 && contractType !== ContractType.Erc1155)
    throw new InvalidAccessCriteriaError(`Invalid contract type: ${contractType}`);
  return contractType;
};

export const validateTokenIds = (tokenIds?: string | string[] | null) => {
  if (!tokenIds) return [];

  const result = Array.isArray(tokenIds)
    ? tokenIds.map((t) => t.toString())
    : [tokenIds.toString()];
  try {
    result.every((tokenId) => BigNumber.from(tokenId));
  } catch (e: any) {
    throw new InvalidAccessCriteriaError(`Invalid token ids: ${result.join(', ')}`);
  }
  return result;
};

export const validateScalarCondition = (condition: ScalarOperator) => {
  const validConditions = ['>', '>=', '<', '<=', '=', '!='] as unknown as ScalarOperator[];
  if (!Object.values(ScalarOperator).concat(validConditions).includes(condition)) {
    throw new ValidationError(`Invalid scalar condition: ${condition}`);
  }
  return condition;
};

export const validateAmount = (amount: string, decimals: number) => {
  try {
    return parseFixed(amount, decimals);
  } catch (error) {
    throw new ValidationError(`Invalid amount: ${amount} or decimals: ${decimals}`);
  }
};

export const validateProfileId = (profileId: string) => {
  const regex = /^0x([a-fA-F0-9]{2})+$/;
  if (!regex.test(profileId)) {
    throw new ValidationError(`Invalid profile id: ${profileId}`);
  }
  return profileId.toLowerCase();
};

export const validatePublicationId = (publicationId: string) => {
  const [profileId, pubId] = publicationId.split('-');
  validateProfileId(profileId);
  validateProfileId(pubId);
};

export const validateLensEnvironment = (env: LensEnvironment) => {
  if (!env || !Object.values(LensEnvironment).includes(env)) {
    throw new EnvironmentError(env);
  }
  return env;
};
