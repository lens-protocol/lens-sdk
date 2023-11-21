import { StrictTypedTypePolicies } from '../../lens';

export const createNftImageTypePolicy = (): StrictTypedTypePolicies['NftImage'] => ({
  keyFields: false,
});
