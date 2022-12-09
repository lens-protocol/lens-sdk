import { ApolloClient } from "@apollo/client";
import { createApolloCache } from "./createApolloCache";
import generatedIntrospection from "../graphql/generated";

type ApolloClientConfig = {
  backendURL: string;
};

export function createApolloClient({ backendURL }: ApolloClientConfig) {
  const uri = `${backendURL}/graphql`;

  return new ApolloClient({
    cache: createApolloCache({
      possibleTypes: generatedIntrospection.possibleTypes,
      typePolicies: {},
    }),
    uri,
  });
}
