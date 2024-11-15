import type { DocumentDecoration } from 'gql.tada';

export type RequestOf<Document> = Document extends DocumentDecoration<
  unknown,
  { request: infer Request }
>
  ? Request
  : never;
