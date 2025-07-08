#!/bin/bash

# Check if BASE_URL environment variable is set
if [ -z "$BASE_URL" ]; then
  echo "Error: BASE_URL environment variable is not set"
  echo "Usage: BASE_URL=https://your-graphql-endpoint.com ./introspection-curl.sh"
  exit 1
fi

echo "Generating introspection from: $BASE_URL"

# Simple curl command to generate GraphQL introspection
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } } fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } }"}' \
  "$BASE_URL" \
  | jq '.data' > ../src/schema.json

echo "Introspection saved to ./src/schema.json" 
