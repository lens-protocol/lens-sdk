import type { FragmentOf } from 'gql.tada';

import {
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from '../fragments';
import { graphql } from '../graphql';

const EnableSignlessResultFragment = graphql(
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
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type EnableSignlessResult = FragmentOf<typeof EnableSignlessResultFragment>;

export const EnableSignlessMutation = graphql(
  `mutation EnableSignless {
    value: enableSignless {
      ...EnableSignlessResult
    }
  }`,
  [EnableSignlessResultFragment],
);

const RemoveSignlessResultFragment = graphql(
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
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type RemoveSignlessResult = FragmentOf<typeof RemoveSignlessResultFragment>;

export const RemoveSignlessMutation = graphql(
  `mutation RemoveSignless {
    value: removeSignless {
      ...RemoveSignlessResult
    }
  }`,
  [RemoveSignlessResultFragment],
);
