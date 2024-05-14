import { EnvironmentConfig, development, production } from '@lens-protocol/react-native';
import Config from 'react-native-config';

const environment = Config.ENVIRONMENT || 'development';

export function getChainId(): number {
  switch (environment) {
    case 'production':
      return 137; // Polygon Mainnet
    case 'development':
      return 80002; // Polygon Testnet Amoy
    default:
      throw new Error(`Unknown environment ${environment}`);
  }
}

export function getLensEnvironment(): EnvironmentConfig {
  switch (environment) {
    case 'production':
      return production;
    case 'development':
      return development;
    default:
      throw new Error(`Unknown environment ${environment}`);
  }
}
