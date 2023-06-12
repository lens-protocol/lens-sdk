import { never } from '@lens-protocol/shared-kernel';

import { erc20Amount, Erc20AmountFields, StrictTypedTypePolicies } from '../../lens';

export function createRevenueAggregateTypePolicy(): StrictTypedTypePolicies['RevenueAggregate'] {
  return {
    fields: {
      totalAmount(_, { readField }) {
        const total =
          (readField('total') as Erc20AmountFields) ?? never('RevenueAggregate total is null');
        return erc20Amount({ from: total });
      },
    },
  };
}
