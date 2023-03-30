import { SupportedChains } from '../conditions/types';
import { EnvironmentConfig } from '../environments';

export const testing: EnvironmentConfig = {
  name: 'development',
  chainId: 80001,
  chainName: SupportedChains.MUMBAI,
  contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
};
