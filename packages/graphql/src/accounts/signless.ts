import type { FragmentOf } from 'gql.tada';

import {
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from '../fragments';
import { graphql } from '../graphql';

const EnableSignlessResult = graphql(
  `fragment EnableSignlessResult on EnableSignlessResult{
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SelfFundedTransactionRequest, SponsoredTransactionRequest, TransactionWillFail],
);
export type EnableSignlessResult = FragmentOf<typeof EnableSignlessResult>;

export const EnableSignlessMutation = graphql(
  `mutation EnableSignless {
    value: enableSignless {
      ...EnableSignlessResult
    }
  }`,
  [EnableSignlessResult],
);

const RemoveSignlessResult = graphql(
  `fragment RemoveSignlessResult on RemoveSignlessResult{
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SelfFundedTransactionRequest, SponsoredTransactionRequest, TransactionWillFail],
);
export type RemoveSignlessResult = FragmentOf<typeof RemoveSignlessResult>;

export const RemoveSignlessMutation = graphql(
  `mutation RemoveSignless {
    value: removeSignless {
      ...RemoveSignlessResult
    }
  }`,
  [RemoveSignlessResult],
);
