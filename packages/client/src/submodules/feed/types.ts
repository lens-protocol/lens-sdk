import {
  InputMaybe,
  LatestPaidActionsFilter,
  LatestPaidActionsWhere,
  LimitType,
  Scalars,
} from '../../graphql/types.generated';

/*
 * The API request type for latestPaidActions query is not consistent with the rest of the API
 * because it was extended later to include additional parameters.
 * I'm fixing it at the SDK level.
 */
export type LatestPaidActionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  where?: LatestPaidActionsWhere;
  filter?: LatestPaidActionsFilter;
};
