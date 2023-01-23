import { TypePolicy } from './TypePolicy';
import { MediaSet } from '../graphql';

export const createMediaSetTypePolicy = (): TypePolicy<MediaSet> => ({
  keyFields: false,
});
