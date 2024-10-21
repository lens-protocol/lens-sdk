import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql-env";
import type { EvmAddress, JSON } from "@lens-social/types";

export const graphql = initGraphQLTada<{
  disableMasking: true;
  introspection: introspection;
  scalars: {
    EvmAddress: EvmAddress;
    JSON: JSON;
  };
}>();
