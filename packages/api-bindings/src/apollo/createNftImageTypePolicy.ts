import { NftImage } from '../graphql';
import { TypePolicy } from './TypePolicy';

export const createNftImageTypePolicy = (): TypePolicy<NftImage> => ({
  keyFields: false,
});
