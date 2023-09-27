import { StrictTypedTypePolicies } from '../../lens';

export const createMediaTypePolicy = (): StrictTypedTypePolicies['Media'] => ({
  keyFields: false,
});
