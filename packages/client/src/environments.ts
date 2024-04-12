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
  'https://api-v2-amoy.lens.dev',
  GatedEnvironments.development,
);

/**
 * @internal
 */
export const staging = new Environment(
  'staging',
  'https://api-amoy.lens-v2.crtlkey.com',
  GatedEnvironments.development,
);
