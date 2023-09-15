/**
 * @internal
 */
export class Environment {
  constructor(
    public readonly name: string,
    private url: string,
  ) {}

  get gqlEndpoint() {
    return this.url;
  }
}

export const production = new Environment('production', 'https://api.lens.dev');

export const development = new Environment('development', 'https://api-v2-mumbai.lens.dev');

export const sandbox = new Environment('sandbox', 'https://api-sandbox-mumbai.lens.dev');
