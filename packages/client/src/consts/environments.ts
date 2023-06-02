/**
 * @internal
 */
export class Environment {
  constructor(public readonly name: string, private url: string) {}

  get gqlEndpoint() {
    return this.url;
  }
}

export const production = new Environment('production', 'https://api.lens.dev');

export const development = new Environment('development', 'https://api-mumbai.lens.dev');

export const sandbox = new Environment('sandbox', 'https://api-sandbox-mumbai.lens.dev');

/**
 * @deprecated Please use the {@link production} variable instead
 *
 * After extensive considerations, we have decided to rename the `polygon` variable into `production`.
 * See also the deprecated {@link mumbai} variable.
 *
 * The new variable names are meant to be more explicit about the intended usage.
 * It also helps to widen the meaning of these as we add features that are not limited to Polygon blockchain.
 */
export const polygon = production;

/**
 * @deprecated Please use the {@link development} variable instead
 *
 * After extensive considerations, we have decided to rename the `mumbai` variable into `development`.
 * See also the deprecated {@link polygon} variable.
 *
 * The new variable names are meant to be more explicit about the intended usage.
 * It also helps to widen the meaning of these as we add features that are not limited to Polygon blockchain.
 */
export const mumbai = development;
