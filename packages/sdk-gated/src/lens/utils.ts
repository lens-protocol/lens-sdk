import { EnvironmentError } from '../error';
import { LensEnvironment } from '../types';

export const getLensAPIUrlFromEnv = (env: LensEnvironment) => {
  switch (env) {
    case LensEnvironment.Polygon:
      return 'https://api.lens.dev';
    case LensEnvironment.Mumbai:
      return 'https://api-mumbai.lens.dev';
    case LensEnvironment.MumbaiSandbox:
      return 'https://api-sandbox-mumbai.lens.dev';
    default:
      throw new EnvironmentError(`Unsupported Lens Environment ${env}`);
  }
};
