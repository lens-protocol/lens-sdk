import { Attribute } from '../../graphql';
import { TypePolicy } from './utils/TypePolicy';

export const createAttributeTypePolicy = (): TypePolicy<Attribute> => ({
  keyFields: false,
});
