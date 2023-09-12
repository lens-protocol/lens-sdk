import * as Types from '../../graphql/types.generated';

export type PublicationStatsVariables = {
  request: Types.PublicationRequest;
  statsRequest?: Types.PublicationStatsInput;
  reactionsRequest?: Types.PublicationStatsReactionArgs;
  openActionsRequest?: Types.PublicationStatsCountOpenActionArgs;
};
