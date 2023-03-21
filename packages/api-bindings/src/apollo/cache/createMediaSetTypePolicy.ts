import { MediaSet } from '../../graphql';
import { TypePolicy } from './utils/TypePolicy';

export const createMediaSetTypePolicy = (): TypePolicy<MediaSet> => ({
  keyFields: false,
});
