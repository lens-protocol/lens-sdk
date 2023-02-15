import { never } from '@lens-protocol/shared-kernel';

import { TypePolicy } from './TypePolicy';
import { erc20Amount, RevenueAggregate } from '../graphql';

export function createRevenueAggregateTypePolicy(): TypePolicy<RevenueAggregate> {
  return {
    fields: {
      totalAmount(_, { readField }) {
        const total = readField('total') ?? never('total is null');
        return erc20Amount({ from: total });
      },
    },
  };
}
