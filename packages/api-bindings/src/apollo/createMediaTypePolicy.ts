import { Media } from '../graphql';
import { TypePolicy } from './TypePolicy';

export const createMediaTypePolicy = (): TypePolicy<Media> => ({
  keyFields: false,
});
