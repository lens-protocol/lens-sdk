import { TypePolicy } from './TypePolicy';
import { Media } from '../graphql';

export const createMediaTypePolicy = (): TypePolicy<Media> => ({
  keyFields: false,
});
