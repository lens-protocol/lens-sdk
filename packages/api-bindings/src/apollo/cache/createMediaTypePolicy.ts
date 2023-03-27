import { StrictTypedTypePolicies } from '../../graphql';

export const createMediaTypePolicy = (): StrictTypedTypePolicies['Media'] => ({
  keyFields: false,
});
