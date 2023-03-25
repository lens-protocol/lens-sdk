import { StrictTypedTypePolicies } from '../../graphql';

export const createNftImageTypePolicy = (): StrictTypedTypePolicies['NftImage'] => ({
  keyFields: false,
});
