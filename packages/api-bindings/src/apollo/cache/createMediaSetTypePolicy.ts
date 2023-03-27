import { StrictTypedTypePolicies } from '../../graphql';

export const createMediaSetTypePolicy = (): StrictTypedTypePolicies['MediaSet'] => ({
  keyFields: false,
});
