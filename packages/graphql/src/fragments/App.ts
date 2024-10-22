import { graphql } from '../graphql';

export const App = graphql(`
  fragment App on App {
    address
  }
`);
