import { App } from './fragments';
import { type RequestOf, graphql } from './graphql';

export const AppQuery = graphql(
  `query App($request: AppRequest!) {
    value: app(request: $request) {
      ...App
    }
  }`,
  [App],
);
export type AppRequest = RequestOf<typeof AppQuery>;
