#!/usr/bin/env tsx

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} from '@urql/introspection';
import { getIntrospectionQuery } from 'graphql';

const baseUrl = process.argv[2];
const outputPath = process.argv[3] || 'schema.json';

if (!baseUrl) {
  console.error('Error: GraphQL endpoint URL is required');
  console.error('Usage: fetch-schema.ts <graphql-endpoint-url> [output-path]');
  console.error(
    'Example: fetch-schema.ts https://your-graphql-endpoint.com schema.json',
  );
  process.exit(1);
}

console.log(`Generating introspection from: ${baseUrl}`);

try {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery({
        descriptions: false,
        oneOf: true,
        schemaDescription: false,
        inputValueDeprecation: false,
      }),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = (await response.json()) as {
    data: unknown;
    errors?: unknown[];
  };

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    process.exit(1);
  }

  const minified = minifyIntrospectionQuery(
    // biome-ignore lint/suspicious/noExplicitAny: simplicity
    getIntrospectedSchema(result.data as any),
  );

  const schemaPath = join(process.cwd(), outputPath);
  writeFileSync(schemaPath, JSON.stringify(minified, null, 2));

  console.log(`Introspection saved to ${outputPath}`);
} catch (error) {
  console.error('Error fetching introspection:', error);
  process.exit(1);
}
