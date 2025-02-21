import { buildSchema } from 'graphql';

import schemaSDL from '../schema.graphql';

/**
 * @internal
 */
export const schema = buildSchema(schemaSDL);
