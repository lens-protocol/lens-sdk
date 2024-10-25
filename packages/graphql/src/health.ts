import { graphql } from './graphql';

export const HealthQuery = graphql(
  `query Health {
    value: health
  }`,
);
