export class Environment {
  constructor(private url: string) {}

  get gqlEndpoint() {
    return this.url;
  }
}

export const polygon = new Environment('https://api.lens.dev');
export const mumbai = new Environment('https://api-mumbai.lens.dev');

// not exposed from the package, used in tests
export const mumbaiSandbox = new Environment('https://api-sandbox-mumbai.lens.dev');
