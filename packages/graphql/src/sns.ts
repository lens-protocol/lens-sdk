import type { FragmentOf } from 'gql.tada';
import { type RequestOf, graphql } from './graphql';

const SnsSubscriptionFragment = graphql(
  `fragment SnsSubscription on SnsSubscription {
    __typename
    id
    account
    webhook
    app
    topic
    topicArn
    filter
  }`,
);
export type SnsSubscription = FragmentOf<typeof SnsSubscriptionFragment>;

export const GetSnsSubscriptionsQuery = graphql(
  `query GetSnsSubscriptions($request: GetSnsSubscriptionsRequest!) {
    value: getSnsSubscriptions(request: $request) {
      ...SnsSubscription
    }
  }`,
  [SnsSubscriptionFragment],
);
export type GetSnsSubscriptionsRequest = RequestOf<typeof GetSnsSubscriptionsQuery>;

export const CreateSnsSubscriptionsMutation = graphql(
  `mutation CreateSnsSubscriptions($request: CreateSnsSubscriptionRequest!) {
    value: createSnsSubscriptions(request: $request) {
      ...SnsSubscription
    }
  }`,
  [SnsSubscriptionFragment],
);
export type CreateSnsSubscriptionRequest = RequestOf<typeof CreateSnsSubscriptionsMutation>;

export const DeleteSnsSubscriptionMutation = graphql(
  `mutation DeleteSnsSubscription($request: DeleteSnsSubscriptionRequest!) {
    value: deleteSnsSubscription(request: $request)
  }`,
);
export type DeleteSnsSubscriptionRequest = RequestOf<typeof DeleteSnsSubscriptionMutation>;
