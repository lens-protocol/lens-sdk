import { StrictTypedTypePolicies } from '../../lens';

export const createMediaSetTypePolicy = (): StrictTypedTypePolicies['MediaSet'] => ({
  keyFields: false,
});
