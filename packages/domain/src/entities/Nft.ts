import { Challenge } from './Transactions';

export type NftId = string;

export type NftOwnershipChallenge = {
  id: string;
  message: Challenge;
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}
