import * as GatedEnvironments from '@lens-protocol/gated-content/environments';

/**
 * @internal
 */
export class Environment {
  constructor(
    public readonly name: string,
    private url: string,
    public readonly gated: GatedEnvironments.EnvironmentConfig,
  ) {}

  get gqlEndpoint() {
    return this.url;
  }
}

export const production = new Environment(
  'production',
  'https://api-v2.lens.dev',
  GatedEnvironments.production,
);

export const development = new Environment(
  'development',
  'https://api-v2-mumbai.lens.dev/graphql',
  GatedEnvironments.development,
);

export const sandbox = new Environment(
  'sandbox',
  'https://api-v2-mumbai.lens.dev/graphql', // same as development for now
  GatedEnvironments.sandbox,
);
