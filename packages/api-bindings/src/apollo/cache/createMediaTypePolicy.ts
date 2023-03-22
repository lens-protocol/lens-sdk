import { Media } from '../../graphql';
import { TypePolicy } from './utils/TypePolicy';

export const createMediaTypePolicy = (): TypePolicy<Media> => ({
  keyFields: false,
});
