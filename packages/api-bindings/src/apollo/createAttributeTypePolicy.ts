import { TypePolicy } from './TypePolicy';
import { Attribute } from '../graphql';

export const createAttributeTypePolicy = (): TypePolicy<Attribute> => ({
  keyFields: false,
});
