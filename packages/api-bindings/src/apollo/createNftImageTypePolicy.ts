import { TypePolicy } from './TypePolicy';
import { NftImage } from '../graphql';

export const createNftImageTypePolicy = (): TypePolicy<NftImage> => ({
  keyFields: false,
});
