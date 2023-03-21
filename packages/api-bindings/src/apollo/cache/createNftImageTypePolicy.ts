import { NftImage } from '../../graphql';
import { TypePolicy } from './utils/TypePolicy';

export const createNftImageTypePolicy = (): TypePolicy<NftImage> => ({
  keyFields: false,
});
