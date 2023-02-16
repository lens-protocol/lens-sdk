import { MediaSet } from '../graphql';
import { TypePolicy } from './TypePolicy';

export const createMediaSetTypePolicy = (): TypePolicy<MediaSet> => ({
  keyFields: false,
});
