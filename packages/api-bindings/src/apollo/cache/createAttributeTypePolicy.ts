import { StrictTypedTypePolicies } from '../../graphql';

export const createAttributeTypePolicy = (): StrictTypedTypePolicies['Attribute'] => ({
  keyFields: false,
});
