import { Attribute } from '../graphql';
import { TypePolicy } from './TypePolicy';

export const createAttributeTypePolicy = (): TypePolicy<Attribute> => ({
  keyFields: false,
});
