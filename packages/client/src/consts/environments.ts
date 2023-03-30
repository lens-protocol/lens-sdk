export class Environment {
  constructor(public readonly name: string, private url: string) {}

  get gqlEndpoint() {
    return this.url;
  }
}

export const polygon = new Environment('production', 'https://api.lens.dev');
export const mumbai = new Environment('staging', 'https://api-mumbai.lens.dev');

// not exposed from the package, used in tests
export const mumbaiSandbox = new Environment('sandbox', 'https://api-sandbox-mumbai.lens.dev');
