import { StrictTypedTypePolicies } from '../../lens';

export const createAttributeTypePolicy = (): StrictTypedTypePolicies['Attribute'] => ({
  keyFields: false,
});
